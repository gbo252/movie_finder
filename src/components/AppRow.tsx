import React from 'react';

const AppRow: React.FC = ({ children }) => {
  return (
    <div
      className="row App text-white position-absolute text-center d-flex justify-content-center"
      data-testid="app-row"
    >
      {children}
    </div>
  );
};

export default AppRow;
