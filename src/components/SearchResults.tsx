import React from 'react';
import Spinner from './Spinner';
import AppRow from './AppRow';
import '../css/SearchResults.css';
import { Movie } from '../types';

type Props = {
  movie: Movie;
  loadingResults: boolean;
};

class SearchResults extends React.Component<Props> {
  renderContent() {
    if (!this.props.loadingResults) {
      return this.props.children;
    } else {
      return (
        <div
          className="netflix-color p-3 mt-2 p-sm-5 m-sm-5"
          data-testid="results-spinner"
        >
          <span className="h2 pr-3">Loading</span>
          <Spinner display />
        </div>
      );
    }
  }

  render() {
    if (this.props.movie.empty) {
      return (
        <AppRow>
          <div
            className="col-auto overlay netflix-color p-5 animate-fade-in"
            data-testid="no-results-found"
          >
            <p className="h4">No Results Found</p>
          </div>
        </AppRow>
      );
    } else if (this.props.movie.title) {
      return (
        <AppRow>
          <div className="col-auto overlay d-flex flex-column px-4 pb-4 justify-content-center align-items-center animate-fade-in">
            {this.renderContent()}
          </div>
        </AppRow>
      );
    } else {
      return null;
    }
  }
}

export default SearchResults;
