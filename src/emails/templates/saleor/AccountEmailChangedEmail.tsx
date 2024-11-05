import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type AccountEmailChangedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type AccountEmailChangedEmailProps = EventData<AccountEmailChangedSubscription>;

const AccountEmailChangedEmail = ({ data }: AccountEmailChangedEmailProps) => {
  return (
    <Layout channel={data.channel?.slug} previewText="Account email changed">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text>Your email address change has been confirmed.</Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: AccountEmailChangedEmailProps = {
  data: {
    user: {
      email: "user@example.com",
      firstName: "Name",
    },
    channel: {
      slug: "channel-us",
    },
  },
};

AccountEmailChangedEmail.PreviewProps = previewProps;
AccountEmailChangedEmail.Subject = "Account email changed";

export default AccountEmailChangedEmail;
