import { Heading } from "@react-email/components";

import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountConfirmationRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountConfirmationRequestedEmail = ({
  data,
}: EventData<AccountConfirmationRequestedSubscription>) => {
  return (
    <Layout previewText="AccountConfirmationRequestedEmail">
      {() => (
        <>
          <Heading className="text-4xl">Hi {data?.user?.firstName}!</Heading>
          <Text className="!mb-2">
            Your account has been created. Please follow the link to activate
            it:
          </Text>
          <Link
            href={data.redirectUrl ?? "#"}
            className="font-bold underline text-[inherit]"
          >
            Activate the account
          </Link>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<AccountConfirmationRequestedSubscription> = {
  data: {
    redirectUrl: "https://example.com",
    token: "123456",
    user: {
      firstName: "Name",
    },
  },
};

AccountConfirmationRequestedEmail.PreviewProps = previewProps;
AccountConfirmationRequestedEmail.Subject =
  "Account confirmation requested email";

export default AccountConfirmationRequestedEmail;
