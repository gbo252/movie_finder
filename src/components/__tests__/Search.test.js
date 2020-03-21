import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '../Search';

const props = {
  movie: {},
  countryPicked: true,
  searchBy: 'genre',
  genre: 'X',
  countryName: 'United Kingdom',
  children: <div>child</div>,
  changeSearchBy: jest.fn(),
  handleSearch: jest.fn(),
  toggleCountryPicked: jest.fn()
};

test('<form />', () => {
  const { getByTestId, getByText } = render(<Search {...props} />);

  expect(getByTestId('search-ul').children.length).toBe(2);

  expect(getByTestId('search-li-genre')).toBeInTheDocument();
  expect(getByTestId('search-li-genre')).toHaveTextContent('Genre');
  fireEvent.click(getByTestId('search-li-genre'));
  expect(props.changeSearchBy).toHaveBeenCalledTimes(1);

  props.changeSearchBy.mockClear();

  expect(getByTestId('search-li-recent')).toBeInTheDocument();
  expect(getByTestId('search-li-recent')).toHaveTextContent('Recently Added');
  fireEvent.click(getByTestId('search-li-recent'));
  expect(props.changeSearchBy).toHaveBeenCalledTimes(1);

  expect(getByText('child')).toBeInTheDocument();

  expect(getByTestId('search-netflix-btn')).toBeDisabled();
  fireEvent.click(getByTestId('search-netflix-btn'));
  expect(props.handleSearch).not.toHaveBeenCalled();
});

test('renderButton() with chosen genre', () => {
  const { getByTestId } = render(<Search {...props} genre="123" />);
  console.error = jest.fn();

  expect(getByTestId('search-netflix-btn')).not.toBeDisabled();
  fireEvent.click(getByTestId('search-netflix-btn'));
  expect(props.handleSearch).toHaveBeenCalledTimes(1);
});

test('country name button', () => {
  const { getByTestId } = render(<Search {...props} />);

  expect(getByTestId('country-name-btn')).toHaveTextContent(props.countryName);
  fireEvent.click(getByTestId('country-name-btn'));
  expect(props.toggleCountryPicked).toHaveBeenCalledTimes(1);
});

test('<Search /> is null', () => {
  const { container } = render(<Search {...props} countryPicked={false} />);

  expect(container.firstChild).toBeNull();
});
