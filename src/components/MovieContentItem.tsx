import React from 'react';

type Props = {
  keyName: string;
  val: string;
};

const MovieContentItem = ({ keyName, val }: Props) => {
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

export default MovieContentItem;
