import Layout from "@/emails/components/Layout";
import { type AccountSetPasswordRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountSetPasswordRequestedEmail = ({
  data,
}: EventData<AccountSetPasswordRequestedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountSetPasswordRequestedEmail">
      {() => <>AccountSetPasswordRequestedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountSetPasswordRequestedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountSetPasswordRequestedEmail.PreviewProps = previewProps;
AccountSetPasswordRequestedEmail.Subject = "Account set password requested";

export default AccountSetPasswordRequestedEmail;
