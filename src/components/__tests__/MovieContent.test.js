import React from 'react';
import { render } from '@testing-library/react';
import MovieContent from '../MovieContent';

const movieContentProps = {
  movie: {
    title: 'Title of film',
    synopsis: 'Film synopsis paragraph bla bla bla',
    image:
      'https://occ-0-114-116.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABQ3zPpA6iqBMD41_IqZnI5juS3Na_Cz9rM-rtMBfnNqB-G60M1XmUvpZpvE_r_nsHTk_3Hx3CBsU3oI9Decm6evnw5F5EM7yR3dtI5ydZ9ud8E-154ashW_mYKU.jpg?r=298',
    runtime: '1h50m',
    released: '2019',
    rating: '6.4'
  },
  searchBy: 'recent',
  genreName: '',
  clearCurrentMovie: jest.fn(),
  handleSearch: jest.fn()
};

// check decodeHtml function
// check event listeners in lifecycle methods? - all about image loads
// check if you can see spinner or not, as opposed to if loading state if false or not for img
// re-check MovieContentItem section for correct values