import { Section } from "@react-email/components";

import Text from "@/emails/components/Text";
import { type AddressFragment } from "@/graphql/operations/fragments/generated";
import { type CountryCode } from "@/graphql/schema";
import { type LocalizedFormatter } from "@/lib/intl/types";

const Address = ({
  address: {
    firstName,
    lastName,
    phone,
    streetAddress1,
    streetAddress2,
    city,
    countryArea,
    country: { code },
    postalCode,
  },
  formatter,
}: {
  address: AddressFragment;
  formatter: LocalizedFormatter;
}) => (
  <Section className="mt-3 font-sm text-subtle">
    <Text>
      {firstName} {lastName},{" "}
      {formatter.country({
        country: code as CountryCode,
      })}
    </Text>
    {phone && <Text>{phone}</Text>}
    <Text>{streetAddress1}</Text>
    {streetAddress2 && <Text>{streetAddress2}</Text>}
    <Text>
      {postalCode} {city}
      {countryArea && `, ${countryArea}`}
    </Text>
  </Section>
);

export default Address;
