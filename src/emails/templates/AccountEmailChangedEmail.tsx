import Layout from "@/emails/components/Layout";
import { type AccountEmailChangedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountEmailChangedEmail = ({
  data,
}: EventData<AccountEmailChangedSubscription>) => {
  return (
    <Layout previewText="AccountEmailChangedEmail">
      {() => <>Your email address change has been confirmed.</>}
    </Layout>
  );
};

const previewProps: EventData<AccountEmailChangedSubscription> = {
  data: {
    user: {
      email: "user@example.com",
      firstName: "Name",
    },
  },
};

AccountEmailChangedEmail.PreviewProps = previewProps;
AccountEmailChangedEmail.Subject = "Account email changed";

export default AccountEmailChangedEmail;