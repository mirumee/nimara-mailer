import { Layout } from "@/components/Layout";
import { type AccountEmailChangedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountEmailChangedEmail = ({
  data,
}: EventData<AccountEmailChangedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountEmailChangedEmail">
      {() => <>AccountEmailChangedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountEmailChangedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountEmailChangedEmail.PreviewProps = previewProps;
AccountEmailChangedEmail.Subject = "Account email changed";

export { AccountEmailChangedEmail };
export default AccountEmailChangedEmail;
