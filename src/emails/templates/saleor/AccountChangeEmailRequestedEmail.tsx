import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountChangeEmailRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type AccountChangeEmailRequestedEmailProps =
  EventData<AccountChangeEmailRequestedSubscription>;

const AccountChangeEmailRequestedEmail = ({
  data,
}: AccountChangeEmailRequestedEmailProps) => {
  return (
    <Layout
      channel={data.channel?.slug}
      previewText="Account change email requested"
    >
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text>
            Your email address change has been requested. If you want to confirm
            changing the email address
            {data.newEmail && (
              <>
                {" to "}
                <strong>{data.newEmail}</strong>
              </>
            )}
            , please follow the link:
            <br />
            <Link
              href={data.redirectUrl ?? "#"}
              className="font-bold text-[inherit] underline"
            >
              Change the mail
            </Link>
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: AccountChangeEmailRequestedEmailProps = {
  data: {
    redirectUrl: "https://example.com",
    user: {
      firstName: "Name",
      email: "user@example.com",
    },
    channel: {
      slug: "channel-us",
    },
    newEmail: "user_new_email@example.com",
  },
};

AccountChangeEmailRequestedEmail.PreviewProps = previewProps;

AccountChangeEmailRequestedEmail.getSubject = (
  data: AccountChangeEmailRequestedEmailProps
) => "Account change email requested";

export default AccountChangeEmailRequestedEmail;
