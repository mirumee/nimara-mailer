import { CONFIG } from "@/config";
import { awsSESEmailProvider } from "@/lib/emails/providers/awsSESEmailProvider";
import { nodeMailerProvider } from "@/lib/emails/providers/nodeEmailMailer";
import { type EmailProviderFactory } from "@/lib/emails/providers/types";

type Provider = typeof CONFIG.EMAIL_PROVIDER;

const PROVIDERS_MAP: Record<Provider, EmailProviderFactory> = {
  NODE_MAILER: nodeMailerProvider,
  AWS_SES: awsSESEmailProvider,
};

export const getEmailProvider = async (): Promise<EmailProviderFactory> => {
  return PROVIDERS_MAP[CONFIG.EMAIL_PROVIDER];
};
