import { render } from "@react-email/components";
import type { Component, ComponentType, FC } from "react";

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
