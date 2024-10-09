import { Link as BaseLink, type LinkProps } from "@react-email/components";

const Link = ({ style, ...props }: LinkProps) => (
  <BaseLink
    style={{
      textDecoration: "underline",
      ...style,
    }}
    {...props}
  />
);

export default Link;
