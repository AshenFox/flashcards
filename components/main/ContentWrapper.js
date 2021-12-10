import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ContentWrapper = ({ children, dimen, tagType = 'main' }) => {
  const { is_scroll, scroll_width } = dimen;

  const Wrapper = tagType;

  const mainSyle = {
    paddingRight: `${scroll_width}px`,
  };

  return <Wrapper style={is_scroll ? {} : mainSyle}>{children}</Wrapper>;
};

ContentWrapper.propTypes = {
  tagType: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  dimen: state.dimen,
});

export default connect(mapStateToProps, {})(ContentWrapper);
