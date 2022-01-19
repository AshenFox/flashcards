import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const TabUpdateController = (props) => {
  useEffect(() => {
    const reload = (e) => {
      console.log('Fire!');
      window.location.reload();
    };

    window.addEventListener('storage', reload);

    return () => window.removeEventListener('storage', reload);
  }, []);

  return <></>;
};

TabUpdateController.propTypes = {};

export default TabUpdateController;
