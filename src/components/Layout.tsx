import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
} from "@react-email/components";
import { type ReactNode } from "react";

import { Footer } from "./Footer";
import { Logo } from "./Logo";
import { ResetStyles } from "./ResetStyles";

type Context = unknown;

export const Layout = ({
  previewText,
  children,
}: {
  children: (opts: Context) => ReactNode;
  previewText: string;
}) => (
  <Html>
    <Tailwind>
      <Head>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <ResetStyles />
      </Head>
      <Preview>{previewText}</Preview>
      <Body className="darkmode-bg mx-auto my-auto scroll-smooth font-[400] text-gray-700 antialiased md:px-2">
        <Container className="mx-auto my-[40px] max-w-[720px] overflow-hidden bg-white">
          <Section className="p-12">
            <Logo />

            {children({})}
          </Section>

          <Footer />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
