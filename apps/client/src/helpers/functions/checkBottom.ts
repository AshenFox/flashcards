export const checkBottom = () => {
  const windowHeight = document.documentElement.clientHeight;

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

  const currentScroll = window.scrollY;

  const bottomOffset = scrollHeight - windowHeight - currentScroll;

  return bottomOffset <= 75;
};
