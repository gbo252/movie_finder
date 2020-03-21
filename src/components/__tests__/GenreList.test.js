import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GenreList from '../GenreList';

const props = {
  searchBy: 'recent',
  genresArray: [
    'Adventures',
    'Crime Films',
    'All Documentaries',
    'All Dramas',
    'Fantasy Movies',
    'All Musicals'
  ],
  genreResults: [
    { 'All Action': [1, 2, 3, 4, 5] },
    { Adventures: [6, 7, 8, 9] },
    { 'Crime Films': [10, 11] },
    { 'All Documentaries': [12, 13, 14, 15, 16] },
    { 'All Dramas': [17, 18, 19] },
    { 'Fantasy Movies': [20, 21, 22, 23, 24] },
    { 'Football Movies': [25, 26, 27] },
    { 'All Musicals': [28, 29] }
  ],
  allGenreCodes: [],
  handleGenreChange: jest.fn()
};

const genreCodesExpected = [
  [6, 7, 8, 9],
  [10, 11],
  [12, 13, 14, 15, 16],
  [17, 18, 19],
  [20, 21, 22, 23, 24],
  [28, 29]
];

const genreOptionsExpected = [
  'Adventure',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Musical'
];

test('genre <select> when searchBy=recent', () => {
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <GenreList {...props} />
  );

  expect(getByTestId('choose-genre-option')).toBeInTheDocument();
  expect(queryByTestId('server-error')).toBeNull();

  expect(getAllByTestId('genre-options').length).toBe(6);
  expect(getAllByTestId('genre-options')[0]).toHaveValue(
    genreCodesExpected[0].join(',')
  );

  const optionTextArr = getAllByTestId('genre-options').map(
    node => node.innerHTML
  );
  expect(optionTextArr).toEqual(genreOptionsExpected);
  expect(optionTextArr).not.toContain('Action');
  expect(optionTextArr).not.toContain('Football');

  expect(props.allGenreCodes).toEqual(genreCodesExpected);

  expect(getByTestId('genre-select')).toBeDisabled();

  fireEvent.change(getByTestId('genre-select'), {
    target: {
      value: '5,6,7,8'
    }
  });
  expect(props.handleGenreChange).toHaveBeenCalledTimes(1);
});

test('genre <select> is NOT disabled when searchBy=genre', () => {
  const { getByTestId } = render(<GenreList {...props} searchBy="genre" />);

  expect(getByTestId('genre-select')).not.toBeDisabled();
});

test('renderGenres() server error', () => {
  const { getByTestId, queryByTestId } = render(
    <GenreList {...props} genreResults={[]} />
  );

  expect(getByTestId('server-error')).toBeInTheDocument();
  expect(queryByTestId('choose-genre-option')).toBeNull();
});
