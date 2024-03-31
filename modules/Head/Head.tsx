import NextHead from 'next/head';
import { memo } from 'react';

const Head = () => {
  return (
    <NextHead>
      <meta name='viewport' content='width=device-width initial-scale=1' />
      <title>Flash Cards</title>
    </NextHead>
  );
};

export default memo(Head);
