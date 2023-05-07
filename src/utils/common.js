export const getStrigifiedStringArrayItems = (arr) => {
  if (!Array.isArray(arr)) return "";
  return arr.map((item) => item).join(", ");
};
