export const trimmedData = (data: string) => {
  const trim = data.trim();
  return trim.length === 0 ? false : true;
};
