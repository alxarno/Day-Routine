export const generateNetworkID = (): string => {
  const res = generateString() + "-" + generateString();
  return res;
};

const generateString = (): string => {
  return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 4);
};
