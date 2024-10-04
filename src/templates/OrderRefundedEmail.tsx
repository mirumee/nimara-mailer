import { Layout } from "@/components/Layout";
import { type OrderRefundedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const OrderRefundedEmail = ({ data }: EventData<OrderRefundedSubscription>) => {
  const order = data!.order!;

  return (
    <Layout previewText="OrderRefundedEmail">
      {() => <>OrderRefundedEmail #{order.number}</>}
    </Layout>
  );
};

const previewProps: EventData<OrderRefundedSubscription> = {
  data: {
    order: {
      number: "1",
      userEmail: "user@example.com",
    },
  },
};

OrderRefundedEmail.PreviewProps = previewProps;
OrderRefundedEmail.Subject = "Order refunded";

export { OrderRefundedEmail };
export default OrderRefundedEmail;
