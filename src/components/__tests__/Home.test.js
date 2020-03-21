import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import unogs from '../../apis/unogs';
import Home from '../Home';

const props = {
  country: 'X',
  countryPicked: false,
  toggleCountryPicked: jest.fn(),
  handleCountryChange: jest.fn()
};

const mockCountries = [
  ['100', null, 'United Kingdom'],
  ['101', null, 'France'],
  ['102', null, 'Spain']
];

test('renderCountries()', async () => {
  unogs.getData = jest.fn(() => Promise.resolve(mockCountries));
  const { getByTestId, getAllByTestId, findByTestId, queryByTestId } = render(
    <Home {...props} />
  );

  expect(getByTestId('loading-options')).toBeInTheDocument();
  expect(queryByTestId('choose-country-option')).toBeNull();
  expect(queryByTestId('server-error')).toBeNull();

  await findByTestId('choose-country-option');
  expect(unogs.getData).toBeCalledTimes(1);
  expect(unogs.getData).toBeCalledWith('country');
  expect(getByTestId('choose-country-option')).toBeInTheDocument();
  expect(queryByTestId('loading-options')).toBeNull();
  expect(queryByTestId('server-error')).toBeNull();

  expect(getAllByTestId('fetched-countries').length).toBe(3);
  expect(getAllByTestId('fetched-countries')[0].value).toBe(
    mockCountries[0][0]
  );
  expect(getAllByTestId('fetched-countries')[0]).toHaveTextContent(
    mockCountries[0][2]
  );
});

test('renderCountries() no countries returned', async () => {
  unogs.getData = jest.fn(() => Promise.resolve([]));
  const { getByTestId, queryByTestId, findByTestId } = render(
    <Home {...props} />
  );

  await findByTestId('server-error');
  expect(getByTestId('server-error')).toBeInTheDocument();
  expect(queryByTestId('loading-options')).toBeNull();
  expect(queryByTestId('choose-country-option')).toBeNull();
});

test('renderButton() no Country selected', () => {
  unogs.getData = jest.fn();
  const { getByTestId, queryByTestId } = render(<Home {...props} />);

  expect(getByTestId('continue-button')).toBeInTheDocument();
  expect(getByTestId('continue-button')).toBeDisabled();
  expect(getByTestId('continue-button')).toHaveAttribute(
    'title',
    'Select a country'
  );
  expect(queryByTestId('loading-button')).toBeNull();
});

test('renderButton() with Country selected', async () => {
  unogs.getData = jest.fn();
  const { getByTestId, queryByTestId } = render(
    <Home {...props} country={mockCountries[0][0]} />
  );

  expect(getByTestId('continue-button')).toBeInTheDocument();
  expect(getByTestId('continue-button')).not.toBeDisabled();
  expect(getByTestId('continue-button')).not.toHaveAttribute(
    'title',
    'Select a country'
  );
  expect(queryByTestId('loading-button')).toBeNull();

  fireEvent.click(getByTestId('continue-button'));
  expect(queryByTestId('continue-button')).toBeNull();
  expect(getByTestId('loading-button')).toBeInTheDocument();

  await waitFor(
    () => {
      expect(props.toggleCountryPicked).toHaveBeenCalledTimes(1);
    },
    { timeout: 3000 }
  );
});

test('handleCountryChange is called', () => {
  unogs.getData = jest.fn();
  const { getByTestId } = render(<Home {...props} />);

  fireEvent.change(getByTestId('country-select'), {
    target: {
      value: mockCountries[0][0]
    }
  });

  expect(props.handleCountryChange).toHaveBeenCalledTimes(1);
});
