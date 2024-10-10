import { type ComponentProps } from "react";

import Section from "@/emails/components/Section";

import LinesSummary from "./LinesSummary";
import SubHeader from "./SubHeader";

const LinsSection = ({
  header,
  ...linesSummaryProps
}: ComponentProps<typeof LinesSummary> & {
  header: string;
}) => (
  <>
    <Section>
      <SubHeader className="mb-8">{header}</SubHeader>
      <LinesSummary {...linesSummaryProps} />
    </Section>
  </>
);

export default LinsSection;
