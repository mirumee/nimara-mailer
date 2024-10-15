import { Column, Img, Row } from "@react-email/components";

import { CONFIG } from "@/config";
import Link from "@/emails/components/Link";
import Text from "@/emails/components/Text";
import { type Paths } from "@/lib/paths";
import { type Maybe } from "@/lib/types";

export type Line = {
  name: string;
  price: string;
  quantity: number;
  slug: Maybe<string>;
  thumbnail: Maybe<string>;
};

const LinesSummary = ({ lines, paths }: { lines: Line[]; paths: Paths }) =>
  lines.map(({ name, price, quantity, slug, thumbnail }, i, list) => (
    <Link
      style={{ textDecoration: "none", color: "unset" }}
      key={slug}
      href={slug ? paths.product({ slug }) : "#"}
    >
      <Row style={{ paddingBottom: i === list.length - 1 ? 0 : 16 }}>
        <Column>
          <Img
            style={{ marginRight: 8 }}
            width={42}
            height={56}
            src={
              thumbnail
                ? thumbnail
                : `${CONFIG.STATIC_URL}/product-placeholder.png`
            }
          />
        </Column>

        <Column
          style={{ verticalAlign: "top", width: "100%" }}
          className="text-xs text-subtle"
        >
          <Text>{name}</Text>

          <Row>
            <Column className="flex text-xs text-subtle">
              <Text>Qty: {quantity}</Text>
            </Column>
            <Column align="right">
              <Text>{price}</Text>
            </Column>
          </Row>
        </Column>
      </Row>
    </Link>
  ));

export default LinesSummary;
