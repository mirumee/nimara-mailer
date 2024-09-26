import { type Body, SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { z } from "zod";

import { prepareConfig } from "@/lib/zod/util";

import { renderEmail } from "../helpers";
import { type EmailProviderFactory } from "./types";

prepareConfig({
  name: "awsSESEmailProvider",
  schema: z.object({
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_REGION: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
  }),
});

export const awsSESEmailProvider: EmailProviderFactory = ({
  fromEmail,
  from,
  toEmail,
}) => {
  /**
   * Envs are injected automatically by @aws-sdk - no need to pass them explicitly.
   */
  const client = new SESClient();

  const render = renderEmail;

  const send = async ({ html, subject }: { html: string; subject: string }) => {
    const command = new SendEmailCommand({
      Source: `${from} <${fromEmail}>`,
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        },
        Subject: { Data: subject },
      },
    });

    const { $metadata } = await client.send(command);

    if ($metadata.httpStatusCode !== 200) {
      throw new Error("Failed to send email.", {
        cause: {
          statusCode: $metadata.httpStatusCode,
          subject,
          toEmail,
          extra: $metadata,
        },
      });
    }
  };

  return { render, send };
};
