import { type z } from "zod";

import { type CUSTOM_EVENTS_SCHEMA } from "@/const";
import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type CustomEventData } from "@/lib/types";

type CustomEventEmailProps = CustomEventData<
  z.infer<(typeof CUSTOM_EVENTS_SCHEMA)["custom_event"]>
>;

const CustomEventEmail = ({
  data: { channel, email, name },
}: CustomEventEmailProps) => {
  return (
    <Layout channel={channel} previewText="Custom event">
      {() => (
        <>
          <Header>Hi {name}!</Header>
          <Text>This is a custom email event sent by the Mirumee team.</Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: CustomEventEmailProps = {
  data: {
    name: "Name",
    email: "user@example.com",
    channel: "channel-us",
  },
};

CustomEventEmail.PreviewProps = previewProps;
CustomEventEmail.Subject = "Custom event";

export default CustomEventEmail;
