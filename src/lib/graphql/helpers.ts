const OPERATION_NAME_RE = new RegExp(
  /[subscription|query|mutation]\s+([^{\s]+)\s*{/
);

export const getOperationName = (document: string) =>
  document.match(OPERATION_NAME_RE)?.[1] ?? "";
