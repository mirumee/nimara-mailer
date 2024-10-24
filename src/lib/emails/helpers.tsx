import { render } from "@react-email/components";
import { type FastifyBaseLogger } from "fastify";
import type { Component, ComponentType, FC } from "react";
import { type ClassNameValue, twJoin, twMerge } from "tailwind-merge";

import { type Maybe } from "@/lib/types";

import { EmailRenderError } from "./errors";

type PropsFrom<C> =
  C extends FC<infer Props>
    ? Props
    : C extends Component<infer Props, any>
      ? Props
      : never;

export const renderEmail = async <C extends ComponentType<any>>({
  template: Component,
  props,
  logger,
}: {
  logger?: FastifyBaseLogger;
  props: PropsFrom<C>;
  template: C;
}) => {
  try {
    return render(<Component {...props} />);
  } catch (err) {
    logger?.error("Failed to render email template.", { Component, props });
    throw new EmailRenderError("Failed to render email template.", {
      cause: { source: err as Error },
    });
  }
};

export const cn = (...input: ClassNameValue[]) => twMerge(twJoin(input));

export const isEmailAllowed = ({
  email,
  allowedDomains,
}: {
  allowedDomains: Maybe<string[]>;
  email: string;
}) => {
  if (allowedDomains) {
    const emailDomain = email.split("@")[1];

    return allowedDomains.some((domain) => domain === emailDomain);
  }

  return true;
};
