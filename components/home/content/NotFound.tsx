import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useAppSelector } from '../../../store/store';

interface OwnProps {}

type Props = OwnProps;

const NotFound: FC<Props> = () => {
  const { draft, cards, modules, search_cards, search_modules } = useAppSelector(
    ({ main }) => main
  );

  const router = useRouter();

  const { section } = router.query;

  useEffect(() => {
    return () => {};
  }, []);

  let content: ReactNode;

  if (section === 'modules') {
    if (!modules.length)
      content = (
        <p>
          No modules matching <b>{`"${search_modules.value}"`}</b> found.
        </p>
      );
    if (!modules.length && search_modules.value === '')
      content = <p>You don't have any modules yet.</p>;
    if (draft) content = false;
  }

  if (section === 'cards') {
    const cardsArr = Object.values(cards);

    if (!cardsArr.length)
      content = (
        <p>
          No cards matching <b>{`"${search_cards.value}"`}</b> found.
        </p>
      );
    if (!cardsArr.length && search_cards.value === '')
      content = <p>You don't have any cards yet.</p>;
  }

  return <div className='home__none-found'>{content}</div>;
};

export default NotFound;
