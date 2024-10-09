import {
  Heading as BaseHeading,
  type HeadingProps,
} from "@react-email/components";

import { cn } from "@/lib/emails/helpers";

const Header = ({ className, ...props }: HeadingProps) => (
  <BaseHeading
    {...props}
    className={cn("text-4xl mt-0 mb-8 font-normal", className)}
  />
);

export default Header;
