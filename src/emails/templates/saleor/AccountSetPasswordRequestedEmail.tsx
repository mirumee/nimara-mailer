import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountSetPasswordRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type AccountSetPasswordRequestedEmailProps =
  EventData<AccountSetPasswordRequestedSubscription>;

const AccountSetPasswordRequestedEmail = ({
  data,
}: AccountSetPasswordRequestedEmailProps) => {
  return (
    <Layout
      channel={data.channel?.slug}
      previewText="Account set password requested"
    >
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text>
            Password reset has been requested. Please follow the link to
            proceed:
            <br />
            <Link
              href={data.redirectUrl ?? "#"}
              className="font-bold underline text-[inherit]"
            >
              Reset the password
            </Link>
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: AccountSetPasswordRequestedEmailProps = {
  data: {
    redirectUrl: "https://example.com",
    user: {
      email: "user@example.com",
      firstName: "Name",
    },
    channel: {
      slug: "channel-us",
    },
  },
};

AccountSetPasswordRequestedEmail.PreviewProps = previewProps;

AccountSetPasswordRequestedEmail.getSubject = (
  data: AccountSetPasswordRequestedEmailProps
) => "Account set password requested";

export default AccountSetPasswordRequestedEmail;
