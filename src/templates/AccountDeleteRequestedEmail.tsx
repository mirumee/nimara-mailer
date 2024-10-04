import { Layout } from "@/components/Layout";
import { type AccountDeleteRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountDeleteRequestedEmail = ({
  data,
}: EventData<AccountDeleteRequestedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountDeleteRequestedEmail">
      {() => <>AccountDeleteRequestedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountDeleteRequestedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountDeleteRequestedEmail.PreviewProps = previewProps;
AccountDeleteRequestedEmail.Subject = "Account delete requested";

export { AccountDeleteRequestedEmail };
export default AccountDeleteRequestedEmail;
