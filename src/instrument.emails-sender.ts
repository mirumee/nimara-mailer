import * as Sentry from "@sentry/aws-serverless";

import { commonInstruments } from "./instrument.common";

Sentry.init(commonInstruments);
