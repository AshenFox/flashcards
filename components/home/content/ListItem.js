import PropTypes from 'prop-types';

const ListItem = ({ children }) => {
  return <>{children}</>;
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListItem;
