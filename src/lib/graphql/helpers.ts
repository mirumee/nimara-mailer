const OPERATION_NAME_RE = new RegExp(
  /[subscription|query|mutation]\s+([^{\s]+)\s*{/g
);

export const getOperationName = (document: string) => {
  const matches = [...document.matchAll(OPERATION_NAME_RE)];
  return matches.map((match) => match[1]).join(", ");
};
