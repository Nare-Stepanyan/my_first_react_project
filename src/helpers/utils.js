export const formatDate = (str = "") => str.slice(0, 10);

export const shortenString = (str, length = 0) => {
  if (!length || str.length <= length) return str;
  return str.slice(0, length) + "...";
};
