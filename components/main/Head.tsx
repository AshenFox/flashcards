import { FC } from 'react';
import NextHead from 'next/head';

interface OwnProps {}

type Props = OwnProps;

const Head: FC<Props> = () => {
  return (
    <NextHead>
      <meta name='viewport' content='width=device-width initial-scale=1' />
      <title>Flash Cards</title>
    </NextHead>
  );
};

export default Head;
