import { type Line } from "@/emails/components/LinesSummary";
import { type OrderLineFragment } from "@/graphql/operations/fragments/generated";
import { type LocalizedFormatter } from "@/lib/intl/types";

export const orderLinetoLine = ({
  line: { quantity, thumbnail, unitPrice, variant, productName, variantName },
  formatter,
  displayGrossPrices,
}: {
  displayGrossPrices: boolean;
  formatter: LocalizedFormatter;
  line: OrderLineFragment;
}): Line => ({
  name: `${productName} • ${variantName}`,
  quantity,
  thumbnail: thumbnail?.url,
  slug: variant?.product?.slug,
  price: formatter.price(
    displayGrossPrices ? unitPrice?.gross : unitPrice?.net
  ),
});
