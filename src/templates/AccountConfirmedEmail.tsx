import { Layout } from "@/components/Layout";
import { type AccountConfirmedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountConfirmedEmail = ({
  data,
}: EventData<AccountConfirmedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountConfirmedEmail">
      {() => <>AccountConfirmedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountConfirmedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountConfirmedEmail.PreviewProps = previewProps;
AccountConfirmedEmail.Subject = "Account Confirmed";

export { AccountConfirmedEmail };
export default AccountConfirmedEmail;
