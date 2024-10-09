import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountChangeEmailRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountChangeEmailRequestedEmail = ({
  data,
}: EventData<AccountChangeEmailRequestedSubscription>) => {
  return (
    <Layout previewText="Account change email requested">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text className="!mb-2">
            Your email address change has been requested. If you want to confirm
            changing the email address to <strong>{data.user?.email}</strong>,
            please follow the link:
          </Text>
          <Link
            href={data.redirectUrl ?? "#"}
            className="font-bold underline text-[inherit]"
          >
            Change the mail
          </Link>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<AccountChangeEmailRequestedSubscription> = {
  data: {
    redirectUrl: "https://example.com",
    user: {
      firstName: "Name",
      email: "user@example.com",
    },
  },
};

AccountChangeEmailRequestedEmail.PreviewProps = previewProps;
AccountChangeEmailRequestedEmail.Subject = "Account change email requested";

export default AccountChangeEmailRequestedEmail;
