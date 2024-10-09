import { Column, Hr, Row, Section } from "@react-email/components";

const Footer = () => (
  <Section className="bg-stone-900 mx-auto text-center  px-10 text-white">
    <div className="my-8">[LOGO]</div>
    <Hr className="!border-[#d7d3d2]" />
    <Row className="my-6 text-right text-[#79716d] text-sm">
      <Column className="w-1/3 whitespace-nowrap">
        © Nimara 2024 All rights reserved.
      </Column>
      <Column className="w-1/3 flex-col">Terms of Use</Column>
      <Column className="w-1/3 flex-col">Privacy Police</Column>
    </Row>
  </Section>
);

export default Footer;
