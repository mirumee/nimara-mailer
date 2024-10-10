import { Hr } from "@react-email/components";

import AddressSection from "@/emails/components/AddressSection";
import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import LinsSection from "@/emails/components/LinesSection";
import { type Line } from "@/emails/components/LinesSummary";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type FulfillmentTrackingNumberUpdatedSubscription } from "@/graphql/operations/subscriptions/generated";
import { orderLinetoLine } from "@/lib/saleor/utils";
import { type EventData } from "@/lib/types";
import { isURL } from "@/lib/utils";

const FulfillmentTrackingNumberUpdatedEmail = ({
  data,
}: EventData<FulfillmentTrackingNumberUpdatedSubscription>) => {
  const order = data!.order!;

  return (
    <Layout channel={order.channel.slug} previewText="Tracking number updated">
      {({ paths, formatter }) => {
        const lines = order.fulfillments
          .map(({ lines }) =>
            lines?.map(
              ({ orderLine, quantity }) =>
                orderLine && {
                  ...orderLinetoLine({
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
        const tracking = order.fulfillments.find(
          ({ trackingNumber }) => trackingNumber
        )?.trackingNumber;
        const isTrackingURL = isURL(tracking ?? "");

        return (
          <>
            <Header>Hello!</Header>
            <Text>
              Fulfillment for the order <strong>{order.number}</strong> has been
              updated.
              <br />
              {isTrackingURL ? (
                <>
                  Tracking url:{" "}
                  <Link href={tracking} className="underline font-bold">
                    {tracking}
                  </Link>
                </>
              ) : (
                <>
                  Tracking number:{" "}
                  <span className="underline font-bold">{tracking}</span>
                </>
              )}
            </Text>

            {order.shippingAddress && (
              <AddressSection
                formatter={formatter}
                header="Shipping address"
                address={order.shippingAddress}
              />
            )}

            <Hr />

            <LinsSection paths={paths} header="Your order" lines={lines} />
          </>
        );
      }}
    </Layout>
  );
};

const previewProps: EventData<FulfillmentTrackingNumberUpdatedSubscription> = {
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
          trackingNumber: "123",
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

FulfillmentTrackingNumberUpdatedEmail.PreviewProps = previewProps;
FulfillmentTrackingNumberUpdatedEmail.Subject = "Tracking number updated";

export default FulfillmentTrackingNumberUpdatedEmail;
