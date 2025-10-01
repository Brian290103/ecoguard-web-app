import type { NextConfig } from "next";

console.log("🔎 Checking environment variables in Next.js build...");

const requiredEnvs = [
  "BETTER_AUTH_SECRET",
  "NEXT_PUBLIC_URL",
  "DATABASE_URL",
  "GOOGLE_GENERATIVE_AI_API_KEY",
  "UPLOADTHING_TOKEN",
  "RESEND_API_KEY",
  "NEXT_PUBLIC_ONE_SIGNAL_APP_ID",
  "ONE_SIGNAL_API_KEY",
  "TEXT_SMS_API_KEY",
  "TEXT_SMS_PARTNER_ID",
  "TEXT_SMS_SHORT_CODE",
  "NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN",
];

for (const key of requiredEnvs) {
  if (!process.env[key]) {
    console.error(`❌ Missing env: ${key}`);
  } else {
    console.log(
      `✅ ${key} is set:`,
      process.env[key]?.substring(0, 15) + "...",
    );
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hosts
      },
      {
        protocol: "http",
        hostname: "**", // also allow http if needed
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
