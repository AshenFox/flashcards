import PropTypes from 'prop-types';

const ListItem = ({ children }) => {
  return <>{children}</>;
};

ListItem.propTypes = {
  children: PropTypes.array.isRequired,
};

export default ListItem;
