import React from 'react';
import PropTypes from 'prop-types';

const MovieContentItem = ({ keyName, val }) => {
  return (
    <div
      data-testid="movie-content-item"
      className="col-4"
      style={{ display: val ? 'block' : 'none' }}
    >
      <h5
        data-testid="movie-content-keyName"
        style={{ display: val ? 'block' : 'none' }}
      >
        {keyName}
      </h5>
      <p data-testid="movie-content-val">
        {keyName === 'Runtime' ? (val || '').replace(/h/, 'h ') : val}
      </p>
    </div>
  );
};

MovieContentItem.propTypes = {
  item: PropTypes.string,
  text: PropTypes.string
};

export default MovieContentItem;
