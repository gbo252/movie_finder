import React from 'react';
import PropTypes from 'prop-types';
import Unogs from '../apis/Unogs';
import netflixLogo from '../images/netflix_logo.png';
import AppRow from './AppRow';
import '../css/Home.css';

class Home extends React.Component {
  state = {
    countries: [],
    loadingSearchScreen: false,
    loadingCountries: false,
    animate: false
  };

  componentDidMount() {
    this.setState({ loadingCountries: true }, async () => {
      const response = await Unogs.getData('country');
      this.setState({ countries: response, loadingCountries: false });
    });
  }

  renderCountries() {
    if (this.state.loadingCountries) {
      return [
        <option value="loading" key="loading" data-testid="loading-options">
          Loading...
        </option>,
        <option value="sizer" key="sizer">
          Czech eepublica..
        </option>
      ];
    } else {
      if (!this.state.countries || !this.state.countries.length) {
        return (
          <option value="Error" key="Error" data-testid="server-error">
            Server Error
          </option>
        );
      } else {
        return [
          <option value="X" key="X" data-testid="choose-country-option">
            Choose country...
          </option>
        ].concat(
          this.state.countries.map(country => {
            return (
              <option
                value={country[0]}
                key={country[0]}
                data-testid="fetched-countries"
              >
                {country[2]}
              </option>
            );
          })
        );
      }
    }
  }

  chooseCountry = event => {
    this.setState({ loadingSearchScreen: true }, () => {
      setTimeout(() => {
        this.setState({ animate: true });
      }, 1500);
      setTimeout(() => {
        this.props.toggleCountryPicked();
        this.setState({ loadingSearchScreen: false });
      }, 2400);
      setTimeout(() => {
        this.setState({ animate: false });
      }, 2500);
    });
    event.preventDefault();
  };

  renderButton() {
    let atts = {};
    if (this.props.country === 'X') {
      atts.disabled = true;
      atts.title = 'Select a country';
    }
    if (this.state.loadingSearchScreen) {
      return (
        <button
          className="btn"
          type="button"
          disabled
          data-testid="loading-button"
        >
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      );
    } else {
      return (
        <span {...atts}>
          <button
            onClick={this.chooseCountry}
            className="btn"
            {...atts}
            data-testid="continue-button"
          >
            Continue
          </button>
        </span>
      );
    }
  }

  render() {
    if (this.props.countryPicked) return null;
    return (
      <AppRow>
        <div
          className={
            'col-auto overlay d-flex flex-column p-4 justify-content-center align-items-center animate-on-screen' +
            (this.state.animate ? ' animate-off-screen' : '')
          }
        >
          <img src={netflixLogo} alt="netflix logo" width="175px" />
          <h2 className="pt-1 pb-2">Random Movie Generator</h2>
          <form>
            <div className="form-group pb-2">
              <label htmlFor="country-list">Select a Country</label>
              <select
                disabled={this.state.loadingCountries}
                onChange={this.props.handleCountryChange}
                id="country-list"
                className="custom-select"
                data-testid="country-select"
              >
                {this.renderCountries()}
              </select>
            </div>
            {this.renderButton()}
          </form>
        </div>
      </AppRow>
    );
  }
}

Home.propTypes = {
  toggleCountryPicked: PropTypes.func,
  country: PropTypes.string,
  handleCountryChange: PropTypes.func,
  countryPicked: PropTypes.bool
};

export default Home;
