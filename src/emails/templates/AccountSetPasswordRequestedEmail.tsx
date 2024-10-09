import Layout from "@/emails/components/Layout";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type AccountSetPasswordRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

import Header from "../components/Header";

const AccountSetPasswordRequestedEmail = ({
  data,
}: EventData<AccountSetPasswordRequestedSubscription>) => {
  return (
    <Layout previewText="Account set password requested">
      {() => (
        <>
          <Header>Hi {data.user?.firstName}!</Header>
          <Text className="!mb-2">
            Password reset has been requested. Please follow the link to
            proceed:
          </Text>
          <Link
            href={data.redirectUrl ?? "#"}
            className="font-bold underline text-[inherit]"
          >
            Reset the password
          </Link>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<AccountSetPasswordRequestedSubscription> = {
  data: {
    redirectUrl: "https://example.com",
    user: {
      email: "user@example.com",
      firstName: "Name",
    },
  },
};

AccountSetPasswordRequestedEmail.PreviewProps = previewProps;
AccountSetPasswordRequestedEmail.Subject = "Account set password requested";

export default AccountSetPasswordRequestedEmail;
