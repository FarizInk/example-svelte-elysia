FROM imbios/bun-node:18-slim as builder
# FROM node:latest as builder
WORKDIR /app

COPY . .
RUN bun install
RUN bunx prisma generate

# Production image
FROM oven/bun:latest
WORKDIR /app

COPY --chown=bun:bun --from=builder /app /app
RUN bun run build

# ENV NODE_ENV production

USER bun

CMD ["bun", "./build/index.js"]
# CMD ["bunx", "--bun", "vite", "preview"]

EXPOSE 4173