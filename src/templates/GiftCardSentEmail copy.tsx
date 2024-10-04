import { Layout } from "@/components/Layout";
import { type GiftCardSentSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const AccountEmailChangedEmail = ({
  data,
}: EventData<GiftCardSentSubscription>) => {
  return (
    <Layout previewText="AccountEmailChangedEmail">
      {() => <>AccountEmailChangedEmail {data?.sentToEmail}</>}
    </Layout>
  );
};

const previewProps: EventData<GiftCardSentSubscription> = {
  data: {
    sentToEmail: "user@example.com",
  },
};

AccountEmailChangedEmail.PreviewProps = previewProps;
AccountEmailChangedEmail.Subject = "Account email changed";

export { AccountEmailChangedEmail };
export default AccountEmailChangedEmail;
