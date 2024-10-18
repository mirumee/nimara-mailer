import { render } from "@react-email/components";
import type { Component, ComponentType, FC } from "react";
import { type ClassNameValue, twJoin, twMerge } from "tailwind-merge";

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
}: {
  props: PropsFrom<C>;
  template: C;
}) => {
  try {
    return render(<Component {...props} />);
  } catch (err) {
    throw new EmailRenderError("Failed to render email template.", {
      cause: { source: err as Error },
    });
  }
};

export const cn = (...input: ClassNameValue[]) => twMerge(twJoin(input));
