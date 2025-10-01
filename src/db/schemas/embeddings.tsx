import {
  index,
  pgTable,
  text,
  uuid,
  varchar,
  vector,
} from "drizzle-orm/pg-core";

export const embeddings = pgTable(
  "embeddings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referenceId: varchar("reference_id", { length: 191 }).notNull(),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 768 }).notNull(),
  },
  (table) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  }),
);
