import React from 'react';
import { render } from '@testing-library/react';
import AppRow from '../AppRow';

const TestComponent = () => {
  return <h1 data-testid="h1-tester">Hello World!</h1>;
};

test('<AppRow />', () => {
  const { getByTestId } = render(
    <AppRow>
      <TestComponent />
    </AppRow>
  );
  expect(getByTestId('app-row')).toBeInTheDocument();
  expect(getByTestId('app-row')).toHaveTextContent('Hello World!');
  expect(getByTestId('app-row')).toContainElement(
    getByTestId('h1-tester')
  );
});
