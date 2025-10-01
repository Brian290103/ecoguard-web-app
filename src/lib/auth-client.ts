import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  $InferAuth: {
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
  },
  plugins: [multiSessionClient()],
});
