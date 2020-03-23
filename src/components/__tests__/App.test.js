import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import unogs from '../../apis/unogs';
import { mockCountries, genreResults, moviesArr, movie } from '../../mockData';

unogs.getData = jest.fn(option => {
  if (option === 'genre') {
    return Promise.resolve(genreResults);
  } else if (option === 'country') {
    return Promise.resolve(mockCountries);
  }
});

unogs.search = jest.fn((_country, genre) => {
  if (!genre) {
    return Promise.resolve([]);
  }
  return Promise.resolve(moviesArr);
});

test('<App /> integration test', async () => {
  const {
    getByTestId,
    getAllByTestId,
    getByText,
    findByTestId,
    queryByTestId
  } = render(<App />);

  expect(getByTestId('Home')).toBeInTheDocument();
  expect(queryByTestId('CountryLogo')).toBeNull();
  expect(queryByTestId('Search')).toBeNull();
  await findByTestId('choose-country-option');
  expect(unogs.getData).toHaveBeenCalledTimes(2);

  fireEvent.change(getByTestId('country-select'), {
    target: {
      value: '100'
    }
  });
  expect(getByTestId('country-select').value).toBe('100');
  fireEvent.click(getByTestId('continue-button'));

  await findByTestId('Search', {}, { timeout: 3000 });
  expect(queryByTestId('Home')).toBeNull();
  expect(getByTestId('CountryLogo')).toBeInTheDocument();
  expect(getByTestId('country-logo-name')).toHaveTextContent('United Kingdom');

  const genreSelect = getByTestId('genre-select');
  fireEvent.change(genreSelect, {
    target: {
      value: '17,18,19'
    }
  });
  expect(genreSelect.options[genreSelect.selectedIndex].text).toBe('Drama');

  fireEvent.click(getByTestId('search-netflix-btn'));
  expect(getByTestId('results-spinner')).toBeInTheDocument();
  expect(unogs.search).toHaveBeenCalledTimes(1);
  expect(unogs.search).toHaveBeenCalledWith('100', '17,18,19');

  await findByTestId('MovieContent');
  expect(getByTestId('CountryLogo')).toBeInTheDocument();
  expect(queryByTestId('Home')).toBeNull();
  expect(queryByTestId('Search')).toBeNull();
  expect(getByTestId('movie-title')).toHaveTextContent('Zoë Comes To Town');
  expect(getAllByTestId('movie-content-image')[0].src).toBe(movie.image);
  expect(getByText('2019')).toBeInTheDocument();
  expect(getByTestId('search-again-button')).toHaveTextContent(
    'search drama again'
  );

  fireEvent.click(getByTestId('search-again-button'));
  expect(unogs.search).toHaveBeenCalledTimes(1);
  expect(getByTestId('results-spinner')).toBeInTheDocument();
  await findByTestId('MovieContent', {}, { timeout: 2500 });

  fireEvent.click(getByTestId('back-button'));
  expect(queryByTestId('MovieContent')).toBeNull();
  expect(queryByTestId('Home')).toBeNull();
  expect(getByTestId('Search')).toBeInTheDocument();

  fireEvent.change(getByTestId('genre-select'), {
    target: {
      value: 'random'
    }
  });
  fireEvent.click(getByTestId('search-netflix-btn'));
  await findByTestId('MovieContent');
  fireEvent.click(getByTestId('back-button'));

  expect(getByTestId('search-netflix-btn')).toBeDisabled();
  fireEvent.click(getByTestId('search-li-recent'));
  expect(getByTestId('search-netflix-btn')).not.toBeDisabled();
  fireEvent.click(getByTestId('search-netflix-btn'));
  expect(unogs.search).toHaveBeenCalled();
  await findByTestId('no-results-found');
  await findByTestId('Search', {}, { timeout: 3000 });
  expect(queryByTestId('no-results-found')).toBeNull();

  fireEvent.click(getByTestId('country-logo-name'));
  expect(queryByTestId('CountryLogo')).toBeNull();
  expect(queryByTestId('Search')).toBeNull();
  expect(queryByTestId('MovieContent')).toBeNull();
  expect(getByTestId('Home')).toBeInTheDocument();
}, 10000);
