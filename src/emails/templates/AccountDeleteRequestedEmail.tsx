import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountDeleteRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountDeleteRequestedEmail = ({
  data,
}: EventData<AccountDeleteRequestedSubscription>) => {
  return (
    <Layout channel={data.channel?.slug} previewText="Account delete requested">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text>
            Please follow the link below:
            <br />
            <Link
              href={data.redirectUrl ?? "#"}
              className="font-bold underline text-[inherit] [text-decoration:underline]"
            >
              Delete account
            </Link>
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<AccountDeleteRequestedSubscription> = {
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

AccountDeleteRequestedEmail.PreviewProps = previewProps;
AccountDeleteRequestedEmail.Subject = "Account delete requested";

export default AccountDeleteRequestedEmail;
