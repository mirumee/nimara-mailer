import Header from "@/emails//components/Header";
import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountConfirmationRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type AccountConfirmationRequestedEmailProps =
  EventData<AccountConfirmationRequestedSubscription>;

const AccountConfirmationRequestedEmail = ({
  data,
}: AccountConfirmationRequestedEmailProps) => {
  return (
    <Layout
      channel={data.channel?.slug}
      previewText="Account confirmation requested email"
    >
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text>
            Your account has been created. Please follow the link to activate
            it:
            <br />
            <Link
              href={data.redirectUrl ?? "#"}
              className="font-bold underline text-[inherit] underline"
            >
              Activate the account
            </Link>
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: AccountConfirmationRequestedEmailProps = {
  data: {
    redirectUrl: "https://example.com",
    user: {
      firstName: "Name",
      email: "user@example.com",
    },
    channel: {
      slug: "channel-us",
    },
  },
};

AccountConfirmationRequestedEmail.PreviewProps = previewProps;
AccountConfirmationRequestedEmail.Subject =
  "Account confirmation requested email";

export default AccountConfirmationRequestedEmail;
