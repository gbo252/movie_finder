import React from 'react';
import netflixLogo from '../images/netflix_logo.png';
import AppRow from './AppRow';
import { Movie, SearchBy } from '../types';
import '../css/Search.css';

type Props = {
  movie: Movie;
  countryPicked: boolean;
  changeSearchBy: (searchByOption: SearchBy) => void;
  searchBy: SearchBy;
  handleSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  genre: string;
  countryName: string;
  toggleCountryPicked: () => void;
};

class Search extends React.Component<Props> {
  searchByOptions: { [key: string]: string } = {
    Genre: SearchBy.genre,
    'Recently Added': SearchBy.recent
  };

  renderSearchByOptions() {
    return Object.keys(this.searchByOptions).map(searchByOption => {
      const searchByOptionValue = this.searchByOptions[searchByOption] as SearchBy;
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
    let atts: { disabled?: boolean; title?: string } = {};
    if (this.props.genre === 'X' && this.props.searchBy === SearchBy.genre) {
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
          <div
            className="col-auto overlay d-flex flex-column p-4 my-auto justify-content-center align-items-center animate-fade-in"
            data-testid="Search"
          >
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

export default Search;
