import { Layout } from "@/components/Layout";
import { type AccountConfirmationRequestedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountConfirmationRequestedEmail = ({
  data,
}: EventData<AccountConfirmationRequestedSubscription>) => {
  const user = data!.user!;

  return (
    <Layout previewText="AccountConfirmationRequestedEmail">
      {() => <>AccountConfirmationRequestedEmail {user.email}</>}
    </Layout>
  );
};

const previewProps: EventData<AccountConfirmationRequestedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
    },
  },
};

AccountConfirmationRequestedEmail.PreviewProps = previewProps;
AccountConfirmationRequestedEmail.Subject =
  "Account confirmation requested email";

export { AccountConfirmationRequestedEmail };
export default AccountConfirmationRequestedEmail;
