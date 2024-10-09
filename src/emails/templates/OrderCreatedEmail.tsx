import Layout from "@/emails/components/Layout";
import { type OrderCreatedSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const OrderCreatedEmail = ({ data }: EventData<OrderCreatedSubscription>) => {
  const order = data!.order!;

  return (
    <Layout previewText="OrderCreatedEmail">
      {() => <>OrderCreatedEmail #{order.number}</>}
    </Layout>
  );
};

const previewProps: EventData<OrderCreatedSubscription> = {
  data: {
    order: {
      number: "1",
      userEmail: "user@example.com",
    },
  },
};

OrderCreatedEmail.PreviewProps = previewProps;
OrderCreatedEmail.Subject = "Order placed";

export default OrderCreatedEmail;
