export const isURL = (str: string) => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
};
