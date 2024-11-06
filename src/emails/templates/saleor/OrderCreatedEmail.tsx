import AddressSection from "@/emails/components/AddressSection";
import CostSummary from "@/emails/components/CostSummary";
import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import LinesSection from "@/emails/components/LinesSection";
import Text from "@/emails/components/Text";
import { type OrderCreatedSubscription } from "@/graphql/operations/subscriptions/generated";
import { orderLineToLine } from "@/lib/saleor/utils";
import { type EventData } from "@/lib/types";

type OrderCreatedEmailProps = EventData<OrderCreatedSubscription>;

const OrderCreatedEmail = ({ data }: OrderCreatedEmailProps) => {
  const order = data.order!;

  return (
    <Layout channel={order.channel.slug} previewText="Order placed">
      {({ formatter, paths }) => (
        <>
          <Header>Hello!</Header>
          <Text>
            Your order number <strong>{order.number}</strong> has been
            successfully confirmed.
          </Text>
          <br />
          <Text>
            Thank you for placing your order! You will soon receive further
            details regarding processing and shipping. If you have any
            questions, feel free to reach out to us.
          </Text>

          {order.shippingAddress && (
            <AddressSection
              formatter={formatter}
              header="Shipping address"
              address={order.shippingAddress}
            />
          )}

          <LinesSection
            paths={paths}
            header="Your order"
            lines={order.lines.map((line) =>
              orderLineToLine({
                line,
                formatter,
                displayGrossPrices: order.displayGrossPrices,
              })
            )}
          />

          <CostSummary
            subtotal={formatter.price(order.subtotal.net)}
            delivery={
              order.shippingPrice.net.amount === 0
                ? "Free"
                : formatter.price(order.shippingPrice.net)
            }
            total={formatter.price(order.total.gross)}
          />
        </>
      )}
    </Layout>
  );
};

const previewProps: OrderCreatedEmailProps = {
  data: {
    order: {
      number: "939",
      userEmail: "kacper.machel+test@mirumee.com",
      user: {
        firstName: "Name",
      },
      displayGrossPrices: true,
      channel: {
        slug: "channel-us",
      },
      languageCodeEnum: "EN_US",
      shippingAddress: {
        id: "QWRkcmVzczoyODEx",
        firstName: "Machelunio",
        lastName: "Macheluino",
        companyName: "",
        streetAddress1: "testowe",
        streetAddress2: "",
        city: "AAAA",
        postalCode: "35004",
        country: {
          code: "US",
        },
        countryArea: "AL",
        phone: "+12034668960",
      },
      shippingPrice: {
        net: {
          amount: 2,
          currency: "USD",
        },
      },
      subtotal: {
        net: {
          amount: 15.99,
          currency: "USD",
        },
      },
      total: {
        gross: {
          amount: 17.99,
          currency: "USD",
        },
      },
      lines: [
        {
          quantity: 1,
          variantName: "MP3",
          productName: "Classical Gems Damian",
          thumbnail: {
            url: "https://marina-dev.eu.saleor.cloud/media/thumbnails/products/11_1ac623f7_95ba9540_thumbnail_256.png",
          },
          unitPrice: {
            gross: {
              amount: 15.99,
              currency: "USD",
            },
            net: {
              amount: 15.99,
              currency: "USD",
            },
          },
          variant: {
            product: {
              slug: "aa-classical-gems",
            },
          },
        },
      ],
    },
  },
};

OrderCreatedEmail.PreviewProps = previewProps;

OrderCreatedEmail.getSubject = (data: OrderCreatedEmailProps) => "Order placed";

export default OrderCreatedEmail;
