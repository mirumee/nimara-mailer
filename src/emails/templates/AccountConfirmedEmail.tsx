import Header from "@/emails//components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type AccountConfirmedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountConfirmedEmail = ({
  data,
}: EventData<AccountConfirmedSubscription>) => {
  return (
    <Layout previewText="AccountConfirmedEmail">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text className="!mb-10">
            We are pleased to inform you that your account has been successfully
            confirmed. You can now fully access all the features of our service.
          </Text>
          <Text>Thank you for joining us!</Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<AccountConfirmedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
      firstName: "Name",
    },
  },
};

AccountConfirmedEmail.PreviewProps = previewProps;
AccountConfirmedEmail.Subject = "Account Confirmed";

export default AccountConfirmedEmail;