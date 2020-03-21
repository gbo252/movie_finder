import React from 'react';
import { render } from '@testing-library/react';
import SearchResults from '../SearchResults';

const emptyMovie = { empty: true, title: ' ' };
const movie = { title: 'Title of Movie' };
const children = <div>child</div>;

test('Search not started yet', () => {
  const { container } = render(<SearchResults movie={{}} />);

  expect(container.firstChild).toBeNull();
});

test('No results found', () => {
  const { getByText } = render(<SearchResults movie={emptyMovie} />);

  expect(getByText('No Results Found')).toBeInTheDocument();
});

test('loading results', () => {
  const { getByTestId, queryByText } = render(
    <SearchResults movie={movie} loadingResults={true} children={children} />
  );

  expect(getByTestId('loading')).toBeVisible();
  expect(queryByText('child')).toBeNull();
});

test('display results', () => {
  const { queryByTestId, getByText } = render(
    <SearchResults movie={movie} loadingResults={false} children={children} />
  );

  expect(queryByTestId('loading')).toBeNull();
  expect(getByText('child')).toBeInTheDocument();
});
