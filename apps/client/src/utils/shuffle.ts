export const shuffle = <T>(array: T[]): T[] => {
  array.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  });

  return array;
};
