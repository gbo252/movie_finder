import React from 'react';
import PropTypes from 'prop-types';
import netflixLogo from '../images/netflix_logo.png';
import AppRow from './AppRow';
import '../css/Search.css';

class Search extends React.Component {
  searchByOptions = {
    Genre: 'genre',
    'Recently Added': 'recent'
  };

  renderSearchByOptions() {
    return Object.keys(this.searchByOptions).map(searchByOption => {
      let searchByOptionValue = this.searchByOptions[searchByOption];
      return (
        <li
          key={searchByOptionValue}
          className={
            'search-by list-group-item p-1' +
            (this.props.searchBy === searchByOptionValue ? ' active' : '')
          }
          onClick={this.props.changeSearchBy.bind(this, searchByOptionValue)}
          data-testid={`search-li-${searchByOptionValue}`}
        >
          {searchByOption}
        </li>
      );
    });
  }

  renderButton() {
    let atts = {};
    if (this.props.genre === 'X' && this.props.searchBy === 'genre') {
      atts.disabled = true;
      atts.title = 'Choose genre';
    }
    return (
      <span {...atts}>
        <button
          onClick={this.props.handleSearch}
          className="btn"
          {...atts}
          data-testid="search-netflix-btn"
        >
          Search Netflix
        </button>
      </span>
    );
  }

  render() {
    if (this.props.countryPicked && !this.props.movie.title) {
      return (
        <AppRow>
          <div className="col-auto overlay d-flex flex-column p-4 justify-content-center align-items-center animate-fade-in">
            <div className="country-logo-inc mb-2 px-4 py-1 rounded">
              <img src={netflixLogo} alt="netflix logo" width="100px" />
              <h5
                id="country-name"
                className="mt-1 mb-0"
                onClick={this.props.toggleCountryPicked}
				title="click to change Country"
				data-testid="country-name-btn"
              >
                {this.props.countryName}
              </h5>
            </div>
            <form className="w-100">
              <label htmlFor="search-by-options">Search By</label>
              <ul
                id="search-by-options"
                className="list-group list-group-horizontal-sm mb-2"
                data-testid="search-ul"
              >
                {this.renderSearchByOptions()}
              </ul>
              {this.props.children}
              {this.renderButton()}
            </form>
          </div>
        </AppRow>
      );
    }
    return null;
  }
}

Search.propTypes = {
  movie: PropTypes.object,
  countryPicked: PropTypes.bool,
  changeSearchBy: PropTypes.func,
  searchBy: PropTypes.string,
  handleSearch: PropTypes.func,
  genre: PropTypes.string,
  countryName: PropTypes.string,
  toggleCountryPicked: PropTypes.func,
  children: PropTypes.object
};

export default Search;
