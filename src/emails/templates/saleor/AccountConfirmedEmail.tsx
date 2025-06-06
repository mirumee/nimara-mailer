import Header from "@/emails//components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type AccountConfirmedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type AccountConfirmedEmailProps = EventData<AccountConfirmedSubscription>;

const AccountConfirmedEmail = ({ data }: AccountConfirmedEmailProps) => {
  return (
    <Layout channel={data.channel?.slug} previewText="Account confirmed">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text className="!mb-10">
            We are pleased to inform you that your account has been successfully
            confirmed. You now have full access to all the features of our
            service.
          </Text>
          <Text>Thank you for joining us!</Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: AccountConfirmedEmailProps = {
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

AccountConfirmedEmail.PreviewProps = previewProps;

AccountConfirmedEmail.getSubject = (data: AccountConfirmedEmailProps) =>
  "Account confirmed";

export default AccountConfirmedEmail;
