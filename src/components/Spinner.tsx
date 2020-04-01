import React from 'react';

type Props = {
  display: boolean;
};

const Spinner = ({ display }: Props) => {
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

export default Spinner;
