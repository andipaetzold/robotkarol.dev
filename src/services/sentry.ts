import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const DSN = process.env.VITE_SENTRY_DSN ?? "";

Sentry.init({
  enabled: DSN.length > 0,
  dsn: DSN,
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
