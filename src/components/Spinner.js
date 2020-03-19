import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ display }) => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={display ? { display: 'inline-block' } : { display: 'none' }}
      data-testid="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.propTypes = {
  display: PropTypes.bool
};

export default Spinner;
