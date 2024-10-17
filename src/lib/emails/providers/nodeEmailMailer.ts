import { createTransport } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { z } from "zod";

import { envBool } from "@/lib/zod/env";
import { prepareConfig } from "@/lib/zod/util";

import { EmailSendError } from "../errors";
import { renderEmail } from "../helpers";
import { type EmailProviderFactory } from "./types";

export const nodeMailerProvider: EmailProviderFactory = ({
  fromEmail,
  from,
  toEmail,
}) => {
  const CONFIG = prepareConfig({
    name: "nodeMailerProvider",
    schema: z.object({
      SMTP_HOST: z.string(),
      SMTP_PORT: z.coerce.number().default(587),
      SMTP_SECURE: envBool.default("false"),
      SMTP_USER: z.string().optional(),
      SMTP_PASSWORD: z.string().optional(),
    }),
  });

  const withAuth = CONFIG.SMTP_USER && CONFIG.SMTP_PASSWORD;
  const transporter = createTransport({
    host: CONFIG.SMTP_HOST,
    port: CONFIG.SMTP_PORT,
    secure: CONFIG.SMTP_SECURE, // true for port 465, false for other ports
    auth: withAuth
      ? {
          user: CONFIG.SMTP_USER,
          pass: CONFIG.SMTP_PASSWORD,
        }
      : undefined,
  });

  const render = renderEmail;

  const send = async ({ html, subject }: { html: string; subject: string }) => {
    transporter.sendMail;
    const options: Mail.Options = {
      from: `${from} <${fromEmail}>`,
      to: toEmail,
      subject,
      html,
    };

    try {
      await transporter.sendMail(options);
    } catch (error) {
      throw new EmailSendError("Failed to send email.", {
        cause: {
          source: error as Error,
        },
      });
    }
  };

  return { render, send };
};
