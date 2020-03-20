import React from 'react';
import { render } from '@testing-library/react';
import MovieContentItem from '../MovieContentItem';

test('correctly formats runtime', () => {
  const { getByTestId } = render(
    <MovieContentItem keyName="Runtime" val="1h55m" />
  );

  expect(getByTestId('movie-content-item')).toBeVisible();
  expect(getByTestId('movie-content-keyName')).toHaveTextContent('Runtime');
  expect(getByTestId('movie-content-val')).toHaveTextContent('1h 55m');
});

test('displays released', () => {
  const { getByTestId } = render(
    <MovieContentItem keyName="Released" val="2019" />
  );

  expect(getByTestId('movie-content-item')).toBeVisible();
  expect(getByTestId('movie-content-keyName')).toHaveTextContent('Released');
  expect(getByTestId('movie-content-val')).toHaveTextContent('2019');
});

test('displays rating', () => {
  const { getByTestId } = render(
    <MovieContentItem keyName="Rating" val="6.4" />
  );

  expect(getByTestId('movie-content-item')).toBeVisible();
  expect(getByTestId('movie-content-keyName')).toHaveTextContent('Rating');
  expect(getByTestId('movie-content-val')).toHaveTextContent('6.4');
});

test('displays no runtime', () => {
  const { getByTestId } = render(<MovieContentItem keyName="Runtime" val="" />);

  expect(getByTestId('movie-content-item')).not.toBeVisible();
});
