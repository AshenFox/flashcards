import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NotFound = ({ main }) => {
  const { cards, search_cards } = main;

  let content;

  const cardsArr = Object.values(cards);

  if (!cardsArr.length)
    content = (
      <p>
        No cards matching <b>{`"${search_cards.value}"`}</b> found.
      </p>
    );

  return <div className='module__none-found'>{content}</div>;
};

NotFound.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(NotFound);

/* 


const NotFound = ({ cards, modules, search_cards, search_modules }) => {
  const router = useRouter();
  const { section } = router.query;

  useEffect(() => {
    return () => {};
  }, []);

  let content;

  if (section === 'modules') {
    if (!modules.length)
      content = (
        <p>
          No modules matching <b>{`'${search_modules.value}'`}</b> found.
        </p>
      );
    if (!modules.length && search_modules.value === '')
      content = <p>You don't have any modules yet.</p>;
  }

  if (section === 'cards') {
    if (!cards.length)
      content = (
        <p>
          No cards matching <b>{`'${search_cards.value}'`}</b> found.
        </p>
      );
    if (!cards.length && search_cards.value === '')
      content = <p>You don't have any cards yet.</p>;
  }

  return <div className='home__none-found'>{content}</div>;
};

*/
