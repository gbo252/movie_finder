import React from 'react';
import { render } from '@testing-library/react';
import MovieContentItem from '../MovieContentItem';

const releasedProps = {
  item: '2020',
  text: 'Released'
};

const runtimeProps = {
  item: '1h55m',
  text: 'Runtime'
};

test('<MovieContentItem /> with no props', () => {
  const { getByTestId } = render(<MovieContentItem />);

  expect(getByTestId('movie-content-item')).not.toBeVisible();
});

test('<MovieContentItem /> with props', () => {
  const { getByTestId } = render(<MovieContentItem item="test" text="text" />);

  expect(getByTestId('movie-content-item')).toBeVisible();
});

test('<MovieContentItem /> with released props', () => {
  const { item, text } = releasedProps;
  const { getByTestId } = render(<MovieContentItem item={item} text={text} />);

  expect(getByTestId('movie-content-title')).toHaveTextContent(text);
  expect(getByTestId('movie-content-text')).toHaveTextContent(item);
});

test('<MovieContentItem /> with runtime props', () => {
  const { item, text } = runtimeProps;
  const { getByTestId } = render(<MovieContentItem item={item} text={text} />);

  expect(getByTestId('movie-content-title')).toHaveTextContent(text);
  expect(getByTestId('movie-content-text')).toHaveTextContent('1h 55m');
});
