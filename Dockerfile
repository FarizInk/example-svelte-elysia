FROM oven/bun

WORKDIR /app

COPY . .
RUN bun install
RUN bun run build

ENV NODE_ENV production
CMD ["bun", "./build/index.js"]

EXPOSE 3000