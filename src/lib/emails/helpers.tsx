import { render } from "@react-email/components";
import type { Component, ComponentType, FC } from "react";
import { type ClassNameValue, twJoin, twMerge } from "tailwind-merge";

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
}) => render(<Component {...props} />);

export const cn = (...input: ClassNameValue[]) => twMerge(twJoin(input));
