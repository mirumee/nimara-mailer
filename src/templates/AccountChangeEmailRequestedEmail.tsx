import { Layout } from "@/components/Layout";
import { type AccountChangeEmailRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountChangeEmailRequestedEmail = ({
  data,
}: EventData<AccountChangeEmailRequestedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountChangeEmailRequestedEmail">
      {() => <>AccountChangeEmailRequestedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountChangeEmailRequestedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountChangeEmailRequestedEmail.PreviewProps = previewProps;
AccountChangeEmailRequestedEmail.Subject = "Account change email requested";

export { AccountChangeEmailRequestedEmail };
export default AccountChangeEmailRequestedEmail;
