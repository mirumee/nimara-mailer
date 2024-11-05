import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type OrderCancelledSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

type OrderCancelledEmailProps = EventData<OrderCancelledSubscription>;

const OrderCancelledEmail = ({ data }: OrderCancelledEmailProps) => {
  const order = data!.order!;

  return (
    <Layout channel={order.channel.slug} previewText="Order cancelled">
      {() => (
        <>
          <Header>Hi {order?.user?.firstName ?? order.userEmail}!</Header>
          <Text className="!mb-4">
            We want to inform you that your order has been successfully
            cancelled.
          </Text>
          <Text>
            Thank you for choosing our service! We look forward to serving you
            again in the future.
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: OrderCancelledEmailProps = {
  data: {
    order: {
      channel: {
        slug: "channel-us",
      },
      user: {
        firstName: "Name",
      },
      userEmail: "user@example.com",
    },
  },
};

OrderCancelledEmail.PreviewProps = previewProps;
OrderCancelledEmail.Subject = "Order cancelled";

export default OrderCancelledEmail;
