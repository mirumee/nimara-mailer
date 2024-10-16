FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN corepack enable
RUN corepack prepare pnpm@9.6.0 --activate

ARG INSTALL_DEV=false

RUN pnpm --version
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then pnpm install --frozen-lockfile ; else pnpm install --frozen-lockfile --production ; fi"

RUN pnpm build


FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache bash
RUN corepack enable
RUN corepack prepare pnpm@9.10.0 --activate

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/types/ /app/types/
COPY --from=builder /app/src/ /app/src/
COPY --from=builder /app/tailwind.config.ts /app/tailwind.config.ts
COPY --from=builder /app/tsconfig.json /app/tsconfig.json
COPY --from=builder /app/etc /app/etc
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000
EXPOSE 3002

CMD [ "pnpm",  "dev" ]
