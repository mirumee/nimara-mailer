import { Column, Hr, Row, Section } from "@react-email/components";

const CostSummary = ({
  delivery,
  subtotal,
  total,
}: {
  delivery: string;
  subtotal: string;
  total: string;
}) => (
  <Section className="text-sm">
    <Hr />

    <Row className="mb-2 mt-4">
      <Column align="left">Subtotal</Column>
      <Column align="right">{subtotal}</Column>
    </Row>

    <Row className="mb-4">
      <Column align="left">Delivery</Column>
      <Column align="right">{delivery}</Column>
    </Row>

    <Hr />

    <Row className="mt-4 font-bold">
      <Column align="left">Total</Column>
      <Column align="right">{total}</Column>
    </Row>
  </Section>
);

export default CostSummary;
