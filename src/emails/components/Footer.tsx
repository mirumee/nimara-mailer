import { Column, Hr, Img, Row, Section } from "@react-email/components";

import { CONFIG } from "@/config";
import Link from "@/emails/components/Link";
import { type Paths } from "@/lib/paths";

const Footer = ({ paths }: { paths: Paths }) => (
  <Section className="bg-stone-900 mx-auto text-center md:px-10 text-white">
    <Link href={paths.home()}>
      <Img
        className="h-9 my-8 px-4"
        src={`${CONFIG.STATIC_URL}/logo-dark.png`}
      />
    </Link>
    <Hr className="!border-[#d7d3d2]" />
    <Row className="my-6 px-4 text-right text-subtle text-sm leading-10">
      <Column className="flex md:whitespace-nowrap md:w-1/3 md:table-cell">
        <Link href={paths.home()}>© Nimara 2024 All rights reserved.</Link>
      </Column>
      <Column className="flex md:w-1/3 md:table-cell">
        <Link href={paths.terms()}>Terms of Use</Link>
      </Column>
      <Column className="flex md:w-1/3 md:table-cell">
        <Link href={paths.privacyPolicy()}>Privacy Policy</Link>
      </Column>
    </Row>
  </Section>
);

export default Footer;
