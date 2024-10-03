import { Layout } from "@/components/Layout";
import { type GiftCardSentSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const GiftCardSentEmail = ({ data }: EventData<GiftCardSentSubscription>) => {
  return (
    <Layout previewText="GiftCardSentEmail">
      {() => <>GiftCardSentEmail {data?.sentToEmail}</>}
    </Layout>
  );
};

const previewProps: EventData<GiftCardSentSubscription> = {
  data: {
    sentToEmail: "user@example.com",
  },
};

GiftCardSentEmail.PreviewProps = previewProps;
GiftCardSentEmail.Subject = "Gift card sent";

export { GiftCardSentEmail };
export default GiftCardSentEmail;
