import React from 'react';
import '../css/CountryLogo.css';
import netflixLogo from '../images/netflix_logo.png';

type Props = {
  countryPicked: boolean;
  toggleCountryPicked: (countryPicked: boolean) => void;
  countryName: string;
};

const CountryLogo = ({
  countryPicked,
  toggleCountryPicked,
  countryName
}: Props) => {
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
        onClick={() => toggleCountryPicked(false)}
        title="click to change Country"
        data-testid="country-logo-name"
      >
        {countryName}
      </h5>
    </div>
  );
};

export default CountryLogo;
