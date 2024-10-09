import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import { type ReactNode } from "react";

import Footer from "@/emails/components/Footer";
import Logo from "@/emails/components/Logo";
import ResetStyles from "@/emails/components/ResetStyles";
import { config } from "@/lib/emails/tailwind";

type Context = unknown;

const Layout = ({
  previewText,
  children,
}: {
  children: (opts: Context) => ReactNode;
  previewText: string;
}) => (
  <Html>
    <Tailwind config={config}>
      <Head>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <ResetStyles />
      </Head>
      <Preview>{previewText}</Preview>
      <Body className="darkmode-bg mx-auto my-auto scroll-smooth font-[400] text-gray-700 antialiased md:px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[720px] overflow-hidden bg-white">
          <Section className="px-20">
            <Logo />

            <Hr className="!border-stone-300" />

            <Section className="pt-8 pb-16">{children({})}</Section>
          </Section>

          <Footer />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default Layout;
