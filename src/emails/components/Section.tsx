import {
  Section as BaseSection,
  type SectionProps,
} from "@react-email/components";

import { cn } from "@/lib/emails/helpers";

const Section = ({ className, ...props }: SectionProps) => (
  <BaseSection {...props} className={cn("my-8", className)} />
);

export default Section;
