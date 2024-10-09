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

FulfillmentTrackingNumberUpdatedEmail.PreviewProps = previewProps;
FulfillmentTrackingNumberUpdatedEmail.Subject = "Tracking number updated";

export default FulfillmentTrackingNumberUpdatedEmail;
