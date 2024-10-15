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
import { type LocalizedFormatter } from "@/lib/intl/types";
import { localizedFormatter } from "@/lib/intl/utils";
import { getPaths, type Paths } from "@/lib/paths";
import { DEFAULT_REGION, getRegion } from "@/lib/regions";
import { type Maybe } from "@/lib/types";

type Context = {
  formatter: LocalizedFormatter;
  paths: Paths;
};

const Layout = ({
  previewText,
  children,
  channel,
}: {
  channel: Maybe<string>;
  children: (opts: Context) => ReactNode;
  previewText: string;
}) => {
  const region = getRegion(channel ?? DEFAULT_REGION.channel);
  const formatter = localizedFormatter(region.locale);
  const paths = getPaths(region.id);

  return (
    <Tailwind config={config as unknown as TailwindConfig}>
      <Html>
        <Head>
          <meta content="light dark" name="color-scheme" />
          <meta content="light dark" name="supported-color-schemes" />
          <ResetStyles />
        </Head>
        <Preview>{previewText}</Preview>

        <Body className="darkmode-bg mx-auto my-auto scroll-smooth font-[400] antialiased md:px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[720px] overflow-hidden bg-white text-stone-700">
            <Section className="px-4 md:px-20">
              <Logo paths={paths} />

              <Hr className="!border-stone-300" />

              <Section className="pt-8 pb-8 md:pb-16">
                {children({ formatter, paths })}
              </Section>
            </Section>

            <Footer paths={paths} />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default Layout;
