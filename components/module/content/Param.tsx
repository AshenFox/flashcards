import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from '../../home/content/Search';

const Param = ({ main }) => {
  const {
    module: { number },
  } = main;

  return (
    <div className='module__param'>
      <div className='module__count'>
        <span>{'Terms in this set ( '}</span>
        <span id='module__counter'>{number ? number : 0}</span>
        <span>{' )'}</span>
      </div>
      <Search />
    </div>
  );
};

Param.propTypes = {
  main: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Param);
