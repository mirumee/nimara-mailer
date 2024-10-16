import * as Sentry from "@sentry/node";

import { commonInstruments } from "./instrument.common";

Sentry.init(commonInstruments);
