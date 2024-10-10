import Layout from "@/emails/components/Layout";
import { type OrderRefundedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const OrderRefundedEmail = ({ data }: EventData<OrderRefundedSubscription>) => {
  const order = data!.order!;

  return (
    <Layout channel={order.channel.slug} previewText="OrderRefundedEmail">
      {() => <>OrderRefundedEmail #{order.number}</>}
    </Layout>
  );
};

const previewProps: EventData<OrderRefundedSubscription> = {
  data: {
    order: {
      channel: {
        slug: "channel-us",
      },
      number: "1",
      userEmail: "user@example.com",
    },
  },
};

OrderRefundedEmail.PreviewProps = previewProps;
OrderRefundedEmail.Subject = "Order refunded";

export default OrderRefundedEmail;
