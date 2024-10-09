import { Column, Hr, Img, Row, Section } from "@react-email/components";

import { CONFIG } from "@/config";

const Footer = () => (
  <Section className="bg-stone-900 mx-auto text-center md:px-10 text-white">
    <Img
      className="h-9 my-8 px-4"
      src={`${CONFIG.STATIC_URL}/emails/logo-dark.png`}
    />
    <Hr className="!border-[#d7d3d2]" />
    <Row className="my-6 px-4 text-right text-[#79716d] text-sm leading-10">
      <Column className="flex md:whitespace-nowrap md:w-1/3 md:table-cell">
        © Nimara 2024 All rights reserved.
      </Column>
      <Column className="flex md:w-1/3 md:table-cell">Terms of Use</Column>
      <Column className="flex md:w-1/3 md:table-cell">Privacy Police</Column>
    </Row>
  </Section>
);

export default Footer;
