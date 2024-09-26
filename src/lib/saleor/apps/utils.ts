export const getJSONFormatHeader = ({
  name,
  version = 1,
}: {
  name: string;
  version?: number;
}) => `application/vnd.mirumee.nimara.${name}.v${version}+json`;
