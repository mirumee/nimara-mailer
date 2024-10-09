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
    <SubHeader>{header}</SubHeader>
    <Section>
      <LinesSummary {...linesSummaryProps} />
    </Section>
  </>
);

export default LinsSection;
