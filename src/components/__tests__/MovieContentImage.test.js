import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieContentImage from '../MovieContentImage';

const props = {
  title: 'Title of Movie',
  image:
    'https://occ-0-114-116.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABQ3zPpA6iqBMD41_IqZnI5juS3Na_Cz9rM-rtMBfnNqB-G60M1XmUvpZpvE_r_nsHTk_3Hx3CBsU3oI9Decm6evnw5F5EM7yR3dtI5ydZ9ud8E-154ashW_mYKU.jpg?r=298'
};

test('<MovieContentImage />', () => {
  const { getByTestId } = render(<MovieContentImage {...props} />);
  const img = getByTestId('movie-content-image');
  const spinner = getByTestId('loading');

  expect(img.src).toBe(props.image);
  expect(img.alt).toBe(props.title);

  expect(spinner).toBeVisible();
  expect(img).not.toBeVisible();

  fireEvent.load(img);
  expect(img).toBeVisible();
  expect(spinner).not.toBeVisible();
});
