import { type SQSRecord } from "aws-lambda";
import { type FastifyRequest } from "fastify";
import { z } from "zod";

import { CONFIG } from "@/config";
import { EMAIL_EVENTS, type EmailEventType } from "@/const";
import { ParsePayloadError } from "@/lib/errors/serverless";

export const payloadSchema = z.object({
  format: z.string(),
  payload: z.object({
    data: z.object({}).passthrough(),
    event: z.enum(EMAIL_EVENTS),
  }),
});

export const serializePayload = ({
  data,
  event,
}: {
  data: FastifyRequest["body"];
  event: EmailEventType;
}) =>
  payloadSchema.parse({
    format: getJSONFormatHeader({ name: CONFIG.NAME }),
    payload: {
      event,
      data,
    },
  });

export const parsePayload = (data: unknown) => payloadSchema.parse(data);

export const getJSONFormatHeader = ({
  name,
  version = 1,
}: {
  name: string;
  version?: number;
}) => `application/vnd.mirumee.nimara.${name}.v${version}+json`;

export const parseRecord = (record: SQSRecord) => {
  try {
    // NOTE: Check aws-lambda.d.ts for explanation.
    const data = JSON.parse(record?.body ?? record?.Body);

    return parsePayload(data);
  } catch (error) {
    console.error("Failed to parse record payload.", { record });
    throw new ParsePayloadError("Failed to parse record payload.", {
      cause: { source: error as Error },
    });
  }
};
