import { Layout } from "@/components/Layout";
import { type OrderCancelledSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const OrderCancelledEmail = ({
  data,
}: EventData<OrderCancelledSubscription>) => {
  const order = data!.order!;

  return (
    <Layout previewText="OrderCancelledEmail">
      {() => <>OrderCancelledEmail #{order.number}</>}
    </Layout>
  );
};

const previewProps: EventData<OrderCancelledSubscription> = {
  data: {
    order: {
      number: "1",
      userEmail: "user@example.com",
    },
  },
};

OrderCancelledEmail.PreviewProps = previewProps;
OrderCancelledEmail.Subject = "Order cancelled";

export { OrderCancelledEmail };
export default OrderCancelledEmail;
