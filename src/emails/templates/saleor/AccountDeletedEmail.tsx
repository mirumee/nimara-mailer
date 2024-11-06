import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type AccountDeletedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type AccountDeletedEmailProps = EventData<AccountDeletedSubscription>;

const AccountDeletedEmail = ({ data }: AccountDeletedEmailProps) => {
  return (
    <Layout channel={data.channel?.slug} previewText="Account Deleted">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text className="!mb-8">
            We want to inform you that your account has been deleted from our
            service. All your data has been permanently removed in accordance
            with our privacy policy.
          </Text>
          <Text>
            Thank you for being with us. If you change your mind, you can always
            create a new account and return to us.
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: AccountDeletedEmailProps = {
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

AccountDeletedEmail.PreviewProps = previewProps;

AccountDeletedEmail.getSubject = (data: AccountDeletedEmailProps) =>
  "Account Deleted";

export default AccountDeletedEmail;
