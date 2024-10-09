import Header from "@/emails//components/Header";
import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountConfirmationRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountConfirmationRequestedEmail = ({
  data,
}: EventData<AccountConfirmationRequestedSubscription>) => {
  return (
    <Layout previewText="Account confirmation requested email">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text>
            Your account has been created. Please follow the link to activate
            it:
            <br />
            <Link
              href={data.redirectUrl ?? "#"}
              className="font-bold underline text-[inherit]"
            >
              Activate the account
            </Link>
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<AccountConfirmationRequestedSubscription> = {
  data: {
    redirectUrl: "https://example.com",
    user: {
      firstName: "Name",
      email: "user@example.com",
    },
  },
};

AccountConfirmationRequestedEmail.PreviewProps = previewProps;
AccountConfirmationRequestedEmail.Subject =
  "Account confirmation requested email";

export default AccountConfirmationRequestedEmail;
