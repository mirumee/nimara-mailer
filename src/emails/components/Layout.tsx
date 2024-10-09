import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  type TailwindConfig,
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
  <Tailwind config={config as unknown as TailwindConfig}>
    <Html>
      <Head>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <ResetStyles />
      </Head>
      <Preview>{previewText}</Preview>
      <Body className="darkmode-bg mx-auto my-auto scroll-smooth font-[400] text-gray-700 antialiased md:px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[720px] overflow-hidden bg-white">
          <Section className="px-4 md:px-20">
            <Logo />

            <Hr className="!border-stone-300" />

            <Section className="pt-8 pb-8 md:pb-16">{children({})}</Section>
          </Section>

          <Footer />
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default Layout;
