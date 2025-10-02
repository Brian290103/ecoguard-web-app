# ---------------------------
# 1. Base image with Bun
# ---------------------------
FROM oven/bun:1.2.19 AS base
WORKDIR /app

# Install build tools for native modules like better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------
# 2. Install dependencies
# ---------------------------
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---------------------------
# 3. Build Next.js app
# ---------------------------
COPY . .

# ✅ Supply dummy envs so Next.js build doesn’t crash
ENV BETTER_AUTH_SECRET=ReMU8ToI6A4Fy5IeS2avQoqtAISNzHbg \
    NEXT_PUBLIC_URL=http://i0c4gokk4ccw4koskkgwwgs4.129.159.252.135.sslip.io \
    DATABASE_URL=postgresql://neondb_owner:npg_1OYzL9WscIHF@ep-orange-surf-adfzgdkw-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require \
    GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyBOemHBi1K-BJWrHlPTsF0hLj7V0U_PxN4 \
    UPLOADTHING_TOKEN=eyJhcGlLZXkiOiJza19saXZlXzk1NDViYzhlYmZiYzQ2YmY2YTU2YmU5NTljYTI4NjMyNGQzODc0YzYwNTg0Y2FlODI0NDAyYzAxYmZmY2QwZjciLCJhcHBJZCI6IjltZHh0NG84eGIiLCJyZWdpb25zIjpbInNlYTEiXX0= \
    RESEND_API_KEY=re_8xjdtygL_7kmTwiAiDKTtYQBMXztzykdS \
    NEXT_PUBLIC_ONE_SIGNAL_APP_ID=813f8ae6-2593-4916-9d57-aff8e360effc \
    ONE_SIGNAL_API_KEY=os_v2_app_qe7yvzrfsnernhkxv74ogyhp7t3x4g452qaet65ei7qat3qt6dfpl4on2tafccqqhicpoz2fnsc2xydgl2ajc3tlbqwknwmwxrpm7zq \
    TEXT_SMS_API_KEY=57ff5fb0d40fefb88593813c9f1a5cb1 \
    TEXT_SMS_PARTNER_ID=12931 \
    TEXT_SMS_SHORT_CODE=TextSMS \
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1Ijoic2FpdGFoIiwiYSI6ImNtZnM5dGZwZjA0YjcybHF2N2xya2lxZ24ifQ.ww4Pl2mWlYP5Gz9LFYC8Xw

RUN bun run build

# ---------------------------
# 4. Production image
# ---------------------------
FROM oven/bun:1.2.19 AS runner
WORKDIR /app

# Copy only required files from build stage
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules

# ✅ Now real env vars will be injected by Coolify at runtime
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the app
CMD ["bun", "run", "start"]
