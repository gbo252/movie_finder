import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../Spinner';

test('<Spinner /> hidden', () => {
  const { getByTestId } = render(<Spinner />);

  expect(getByTestId('loading')).not.toBeVisible();
});

test('<Spinner /> display: true', () => {
  const { getByTestId } = render(<Spinner display={true} />);

  expect(getByTestId('loading')).toBeVisible();
});
