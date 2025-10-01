import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { generateEmbeddings } from "../services/embeddings";
import { publicProcedure, router } from "../trpc";

const generateEmbeddingsInput = z.object({
  orgDescription: z.string().min(10, "Description is required"),
});

export const embeddingsRouter = router({
  generateOrgEmbeddings: publicProcedure
    .input(generateEmbeddingsInput)
    .mutation(async ({ input }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) {
        throw new Error("Unauthorized");
      }

      await generateEmbeddings(input.orgDescription, session.user.id);

      return { success: true };
    }),
});
