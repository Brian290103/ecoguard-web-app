import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { multiSession } from "better-auth/plugins";
import { db } from "@/db/drizzle"; // your drizzle instance
import * as schema from "@/db/schema";

export const auth = betterAuth({
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true,
      },
      bio: {
        type: "string",
        required: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
      location: {
        type: "json",
        required: false,
      },
      interests: {
        type: "string[]",
        required: false,
      },
      accountStatus: {
        type: "string",
        required: false,
      },
      county: {
        type: "string",
        required: false,
      },
      subCounty: {
        type: "string",
        required: false,
      },
      jobTitle: {
        type: "string",
        required: false,
      },
      isApproved: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      orgName: {
        type: "string",
        required: false,
      },
      orgDescription: {
        type: "string",
        required: false,
      },
      orgLogo: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [multiSession(), nextCookies()], // make sure this is the last plugin in the array
});
