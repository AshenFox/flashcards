export const shuffle = (array) => {
  array.forEach((item, i) => {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  });

  return array;
};
