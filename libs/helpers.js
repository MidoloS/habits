export const getHighestValueKey = (obj) => {
  let highestKey = null;
  let highestValue = 0;
  for (let [key, value] of Object.entries(obj)) {
    if (value > highestValue) {
      highestKey = key;
      highestValue = value;
    }
  }
  return highestKey;
};
