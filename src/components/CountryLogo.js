import React from 'react';
import PropTypes from 'prop-types';
import '../css/CountryLogo.css';
import netflixLogo from '../images/netflix_logo.png';

const CountryLogo = ({ countryPicked, toggleCountryPicked, countryName }) => {
  if (!countryPicked) return null;
  return (
    <div
      className="country-logo overlay text-white text-center ml-1 mt-3 py-3 animate-fade-in"
      style={{ width: '250px' }}
      data-testid="CountryLogo"
    >
      <img src={netflixLogo} alt="netflix logo" width="175px" />
      <h5
        id="country-name"
        className="mt-1 mb-0"
        onClick={toggleCountryPicked}
        title="click to change Country"
        data-testid="country-logo-name"
      >
        {countryName}
      </h5>
    </div>
  );
};

CountryLogo.propTypes = {
  countryName: PropTypes.string,
  toggleCountryPicked: PropTypes.func,
  countryPicked: PropTypes.bool
};

export default CountryLogo;
