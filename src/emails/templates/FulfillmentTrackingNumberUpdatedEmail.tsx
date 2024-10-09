import Layout from "@/emails/components/Layout";
import { type FulfillmentTrackingNumberUpdatedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const FulfillmentTrackingNumberUpdatedEmail = ({
  data,
}: EventData<FulfillmentTrackingNumberUpdatedSubscription>) => {
  const order = data!.order!;

  return (
    <Layout previewText="FulfillmentTrackingNumberUpdatedEmail">
      {() => <>FulfillmentTrackingNumberUpdatedEmail #{order.number}</>}
    </Layout>
  );
};

const previewProps: EventData<FulfillmentTrackingNumberUpdatedSubscription> = {
  data: {
    order: {
      number: "1",
      userEmail: "user@example.com",
    },
  },
};

FulfillmentTrackingNumberUpdatedEmail.PreviewProps = previewProps;
FulfillmentTrackingNumberUpdatedEmail.Subject = "Tracking number updated";

export default FulfillmentTrackingNumberUpdatedEmail;
