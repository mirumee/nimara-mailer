import { Hr } from "@react-email/components";

import AddressSection from "@/emails/components/AddressSection";
import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import LinesSection from "@/emails/components/LinesSection";
import { type Line } from "@/emails/components/LinesSummary";
import Text from "@/emails/components/Text";
import { type FulfillmentCreatedSubscription } from "@/graphql/operations/subscriptions/generated";
import { orderLineToLine } from "@/lib/saleor/utils";
import { type EventData } from "@/lib/types";

const FulfillmentCreatedEmail = ({
  data,
}: EventData<FulfillmentCreatedSubscription>) => {
  const order = data!.order!;

  return (
    <Layout channel={order.channel.slug} previewText="Fulfillment updated">
      {({ formatter, paths }) => {
        const lines = order.fulfillments
          .map(({ lines }) =>
            lines?.map(
              ({ orderLine, quantity }) =>
                orderLine && {
                  ...orderLineToLine({
                    line: orderLine,
                    formatter,
                    displayGrossPrices: order.displayGrossPrices,
                  }),
                  quantity,
                }
            )
          )
          .filter(Boolean)
          .flat() as Line[];

        return (
          <>
            <Header>Hello!</Header>
            <Text>
              Fulfillment for the order <strong>{order.number}</strong> has been
              updated.
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

            <Hr />

            <LinesSection paths={paths} header="Your order" lines={lines} />
          </>
        );
      }}
    </Layout>
  );
};

const previewProps: EventData<FulfillmentCreatedSubscription> = {
  data: {
    order: {
      number: "941",
      displayGrossPrices: true,
      languageCodeEnum: "EN_US",
      channel: {
        slug: "channel-us",
      },
      userEmail: "kacper.machel+test@mirumee.com",
      user: {
        firstName: "Machelunio",
      },
      shippingAddress: {
        id: "QWRkcmVzczoyODE3",
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
      fulfillments: [
        {
          lines: [
            {
              quantity: 1,
              orderLine: {
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
            },
          ],
        },
      ],
    },
  },
};

FulfillmentCreatedEmail.PreviewProps = previewProps;
FulfillmentCreatedEmail.Subject = "Fulfillment updated";

export default FulfillmentCreatedEmail;
