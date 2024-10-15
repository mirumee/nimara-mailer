import { Text as BaseText, type TextProps } from "@react-email/components";

const Text = ({ className, ...props }: TextProps) => (
  <BaseText {...props} className={`text-base ${className}`} />
);

export default Text;
