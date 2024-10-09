import Header from "@/emails/components/Header";
import Layout from "@/emails/components/Layout";
import Text from "@/emails/components/Text";
import { type GiftCardSentSubscription } from "@/graphql/operations/subscriptions/generated";
import { type EventData } from "@/lib/types";

const GiftCardSentEmail = ({ data }: EventData<GiftCardSentSubscription>) => {
  return (
    <Layout channel={data.channel} previewText="GiftCardSentEmail">
      {() => (
        <>
          <Header>Hi {data.sentToEmail}!</Header>
          <Text>
            Heres your gift card code <strong>{data.giftCard?.code}</strong>.
            <br />
            Thank you for being a part of our community!
          </Text>
        </>
      )}
    </Layout>
  );
};

const previewProps: EventData<GiftCardSentSubscription> = {
  data: {
    sentToEmail: "user@example.com",
    channel: "channel-us",
    giftCard: {
      code: "1234",
      product: {
        thumbnail: {
          url: "https://marina-dev.eu.saleor.cloud/media/thumbnails/products/11_1ac623f7_95ba9540_thumbnail_1024.png",
        },
      },
    },
  },
};

GiftCardSentEmail.PreviewProps = previewProps;
GiftCardSentEmail.Subject = "Gift card sent";

export default GiftCardSentEmail;
