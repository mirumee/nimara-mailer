import {
  Heading as BaseHeading,
  type HeadingProps,
} from "@react-email/components";

import { cn } from "@/lib/emails/helpers";

const SubHeader = ({ className, ...props }: HeadingProps) => (
  <BaseHeading
    {...props}
    className={cn("text-2xl !m-0 font-normal", className)}
  />
);

export default SubHeader;
