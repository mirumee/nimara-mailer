import {
  SendEmailCommand,
  SESClient,
  SESServiceException,
} from "@aws-sdk/client-ses";
import { z } from "zod";

import { prepareConfig } from "@/lib/zod/util";

import { EmailSendError } from "../errors";
import { renderEmail } from "../helpers";
import { type EmailProviderFactory } from "./types";

export const awsSESEmailProvider: EmailProviderFactory = ({
  fromEmail,
  from,
  toEmail,
}) => {
  /**
   * Envs are injected automatically by @aws-sdk - no need to pass them explicitly.
   */
  prepareConfig({
    name: "awsSESEmailProvider",
    schema: z.object({
      AWS_ACCESS_KEY_ID: z.string(),
      AWS_REGION: z.string(),
      AWS_SECRET_ACCESS_KEY: z.string(),
      AWS_ENDPOINT_URL: z.string().url().optional(),
    }),
  });

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

    try {
      await client.send(command);
    } catch (error) {
      if (error instanceof SESServiceException) {
        throw new EmailSendError("Failed to send email.", {
          cause: {
            source: error as Error,
            message: error.message,
            $fault: error?.$fault,
            subject,
            toEmail,
            ...error.$metadata,
          },
        });
      }

      throw error;
    }
  };
  return { render, send };
};
