import { type renderEmail } from "../helpers";

export type EmailProviderFactory = (opts: {
  from: string;
  fromEmail: string;
  toEmail: string;
}) => {
  render: typeof renderEmail;
  send: (opts: { html: string; subject: string }) => Promise<void>;
};
