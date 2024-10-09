import Layout from "@/emails/components/Layout";
import { type AccountDeletedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountDeletedEmail = ({
  data,
}: EventData<AccountDeletedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountDeletedEmail">
      {() => <>AccountDeletedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountDeletedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountDeletedEmail.PreviewProps = previewProps;
AccountDeletedEmail.Subject = "Account Deleted";

export default AccountDeletedEmail;
