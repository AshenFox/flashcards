import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scrape_dictionary } from '../../../store/actions/editActions';

const Scrape = ({ data, scrape_dictionary }) => {
  const {
    _id,
    scrape: { loading },
  } = data;

  const clickScrapeButton = (value) => () => {
    scrape_dictionary(_id, value);
  };

  return (
    <div className='edit__scrape-panel' data-loading={loading}>
      <div
        className='edit__scrape-button edit__scrape-button--cod'
        onClick={clickScrapeButton('cod')}
      >
        <div className='edit__scrape-background'></div>
        <span>Search in Cambridge Online Dictionary</span>
      </div>
      <div
        className='edit__scrape-button edit__scrape-button--urban'
        onClick={clickScrapeButton('urban')}
      >
        <div className='edit__scrape-background'></div>
        <span>Search in Urban Dictionary</span>
      </div>
    </div>
  );
};

Scrape.propTypes = {
  data: PropTypes.object.isRequired,
  scrape_dictionary: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(false, {
  scrape_dictionary,
})(Scrape);
