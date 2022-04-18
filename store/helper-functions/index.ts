export const shuffle = (array: any[]) => {
  array.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  });

  return array;
};

export const saveLastUpdate = () => localStorage.setItem('lastUpdated', Date.now() + '');
