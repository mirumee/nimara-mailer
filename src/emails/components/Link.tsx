import { Link as BaseLink, type LinkProps } from "@react-email/components";

const Link = ({ style, ...props }: LinkProps) => (
  <BaseLink
    style={{
      color: "unset",
      ...style,
    }}
    {...props}
  />
);

export default Link;
