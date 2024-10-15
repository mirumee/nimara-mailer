import { type ComponentProps } from "react";

import Address from "@/emails/components/Address";
import Section from "@/emails/components/Section";
import SubHeader from "@/emails/components/SubHeader";

const AddressSection = ({
  header,
  ...addressProps
}: ComponentProps<typeof Address> & {
  header: string;
}) => (
  <Section>
    <SubHeader>{header}</SubHeader>
    <Address {...addressProps} />
  </Section>
);

export default AddressSection;
