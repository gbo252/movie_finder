import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CountryLogo from '../CountryLogo';

const falseProps = {
  countryPicked: false,
  toggleCountryPicked: jest.fn(),
  countryName: ''
};

const trueProps = {
  countryPicked: true,
  toggleCountryPicked: jest.fn(),
  countryName: 'United Kingdom'
};

test('<CountryLogo /> no props', () => {
  const { queryByTestId } = render(<CountryLogo />);

  expect(queryByTestId('country-logo')).toBeNull();
});

test('<CountryLogo /> with no country picked', () => {
  const { queryByTestId } = render(<CountryLogo {...falseProps} />);

  expect(queryByTestId('country-logo')).toBeNull();
});

test('<CountryLogo /> with country picked', () => {
  const { toggleCountryPicked, countryName } = trueProps;
  const { getByTestId } = render(<CountryLogo {...trueProps} />);

  expect(getByTestId('country-logo-name')).toHaveTextContent(countryName);
  fireEvent.click(getByTestId('country-logo-name'));
  expect(toggleCountryPicked).toHaveBeenCalledTimes(1);
  toggleCountryPicked.mockClear();
});
