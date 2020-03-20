import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieContent from '../MovieContent';

const movie = {
  title: 'Zo&euml; Comes To Town',
  synopsis: 'Film synopsis paragraph &divide;',
  image:
    'https://occ-0-114-116.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABQ3zPpA6iqBMD41_IqZnI5juS3Na_Cz9rM-rtMBfnNqB-G60M1XmUvpZpvE_r_nsHTk_3Hx3CBsU3oI9Decm6evnw5F5EM7yR3dtI5ydZ9ud8E-154ashW_mYKU.jpg?r=298',
  runtime: '1h50m',
  released: '2019',
  rating: '6.4'
};

const props = {
  movie,
  searchBy: 'recent',
  genreName: '',
  clearCurrentMovie: jest.fn(),
  handleSearch: jest.fn()
};

test('decodeHtml for title and synopsis', () => {
  const { getByTestId } = render(<MovieContent {...props} />);

  expect(getByTestId('movie-title')).toHaveTextContent('Zoë Comes To Town');
  expect(getByTestId('movie-synopsis')).toHaveTextContent(
    'Film synopsis paragraph ÷'
  );
});

test('decodeHtml with no title and synopsis', () => {
  const { getByTestId } = render(
    <MovieContent {...props} movie={{ ...movie, title: '', synopsis: '' }} />
  );

  expect(getByTestId('movie-title')).toHaveTextContent('');
  expect(getByTestId('movie-synopsis')).toHaveTextContent('');
});

test('contains 2 <MovieContentImage />', () => {
  const { getAllByTestId } = render(<MovieContent {...props} />);

  expect(getAllByTestId('movie-content-image').length).toBe(2);
});

test('displays 3 <MovieContentItem />', () => {
  const { getAllByTestId } = render(<MovieContent {...props} />);

  expect(getAllByTestId('movie-content-item').length).toBe(3);
});

test('search again button text - recently', () => {
  const { getByTestId } = render(<MovieContent {...props} />);

  expect(getByTestId('search-again-button')).toHaveTextContent(
    'search recently added again'
  );
});

test('search again button text - genre', () => {
  const { getByTestId } = render(
    <MovieContent {...props} searchBy="genre" genreName="Fantasy" />
  );

  expect(getByTestId('search-again-button')).toHaveTextContent(
    'search fantasy again'
  );
});

test('search-again button that triggers handleSearch', () => {
  const { getByTestId } = render(<MovieContent {...props} />);
  console.error = jest.fn();

  fireEvent.click(getByTestId('search-again-button'));
  expect(props.handleSearch).toHaveBeenCalledTimes(1);
});

test('back button that triggers clearCurrentMovie', () => {
  const { getByTestId } = render(<MovieContent {...props} />);

  fireEvent.click(getByTestId('back-button'));
  expect(props.clearCurrentMovie).toHaveBeenCalledTimes(1);
});
