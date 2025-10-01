import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";
import { and, cosineDistance, desc, eq, gt, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth";
import { embeddings } from "@/db/schemas/embeddings";

const embeddingModel = google.textEmbedding("text-embedding-004");

export const generateChunks = (
  input: string,
  size = 1000,
  overlap = 200,
): string[] => {
  const text = input.trim().replace(/\s+/g, " "); // normalize spaces
  const chunks: string[] = [];
  let i = 0;

  while (i < text.length) {
    const end = i + size;
    chunks.push(text.slice(i, end));
    i += size - overlap; // slide forward with overlap
  }

  return chunks;
};

export const generateEmbeddings = async (
  value: string,
  referenceId: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings: generatedEmbeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });

  const embeddingValues = generatedEmbeddings.map((e, i) => ({
    content: chunks[i],
    embedding: e,
    referenceId,
  }));

  await db.insert(embeddings).values(embeddingValues);

  return embeddingValues;
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};
export const findRelevantOrganizations = async (reportDescription: string) => {
  console.log(
    "Finding relevant organizations for description:",
    reportDescription,
  );

  // Generate the embedding for the query
  const reportEmbedding = await generateEmbedding(reportDescription);
  console.log("Generated embedding vector of length:", reportEmbedding.length);

  // Similarity calculation
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    reportEmbedding,
  )})`;
  console.log("Created similarity calculation SQL expression", similarity);

  const relevantOrgs = await db
    .select({
      organizationId: user.id,
      similarity,
    })
    .from(embeddings)
    .innerJoin(user, eq(embeddings.referenceId, user.id))
    .where(
      and(
        eq(user.role, "org"),
        gt(similarity, 0.1), // <-- only relevant matches
      ),
    )
    .orderBy((t) => desc(t.similarity))
    .limit(5);

  console.log("Found relevant organizations:", {
    count: relevantOrgs.length,
    organizations: relevantOrgs.map((org) => ({
      id: org.organizationId,
      similarity: org.similarity,
    })),
  });

  return relevantOrgs;
};
