import { type init } from "@sentry/node";

import { CONFIG } from "./config";

type Options = Parameters<typeof init>[0];

const isSentryEnabled = !!CONFIG.SENTRY_DSN;

export const commonInstruments: Options = {
  serverName: CONFIG.SERVICE,
  environment: CONFIG.ENVIRONMENT,
  release: CONFIG.RELEASE,
  sampleRate: CONFIG.IS_DEVELOPMENT ? 0.1 : 1.0,
  normalizeDepth: 10,
  enabled: isSentryEnabled,
};
