import React from 'react';
import PropTypes from 'prop-types';

const MovieContentItem = ({ item, text }) => {
  return (
    <div
      data-testid="movie-content-item"
      className="col-4"
      style={{ display: item ? 'block' : 'none' }}
    >
      <h5
        data-testid="movie-content-title"
        style={{ display: item ? 'block' : 'none' }}
      >
        {text}
      </h5>
      <p data-testid="movie-content-text">
        {text === 'Runtime' ? (item || '').replace(/h/, 'h ') : item}
      </p>
    </div>
  );
};

MovieContentItem.propTypes = {
  item: PropTypes.string,
  text: PropTypes.string
};

export default MovieContentItem;
