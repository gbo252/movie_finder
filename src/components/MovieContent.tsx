import React from 'react';
import '../css/MovieContent.css';
import MovieContentItem from './MovieContentItem';
import MovieContentImage from './MovieContentImage';
import { Movie, SearchBy } from '../types';

const decodeHtml = (html: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

type Props = {
  movie: Movie;
  clearCurrentMovie: () => void;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchBy: SearchBy;
  genreName: string;
};

class MovieContent extends React.Component<Props> {
  renderInfoItems() {
    const infoItems: { [key: string]: string } = {
      Runtime: this.props.movie.runtime!,
      Released: this.props.movie.released!,
      Rating: this.props.movie.rating!
    };

    return Object.keys(infoItems).map(
      (keyName) => {
        const val = infoItems[keyName];
        return <MovieContentItem key={keyName} keyName={keyName} val={val} />;
      }
    );
  }

  render() {
    const { title, synopsis, image } = this.props.movie;

    return (
      <div data-testid="MovieContent">
        <button
          type="button"
          onClick={this.props.clearCurrentMovie}
          className="btn btn-lg btn-link btn-block text-left px-0 ml-md-n3 back-button netflix-color font-weight-bold"
          data-testid="back-button"
        >
          BACK
        </button>
        <div className="d-flex justify-content-center px-2">
          <div
            className="overlay movie-info text-left d-flex flex-column justify-content-around"
            style={{ maxWidth: '450px' }}
          >
            <h3 className="text-center" data-testid="movie-title">
              {decodeHtml(title || '')}
            </h3>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col d-flex flex-column justify-content-center">
                <h5>Synopsis</h5>
                <p data-testid="movie-synopsis">{decodeHtml(synopsis || '')}</p>
              </div>
              <div className="image-column col-5 d-flex justify-content-center align-items-center mb-2">
                <MovieContentImage image={image!} title={title!} />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              {this.renderInfoItems()}
            </div>
            <form className="mx-auto">
              <button
                onClick={this.props.handleSearch}
                className="btn"
                data-testid="search-again-button"
              >
                search{' '}
                {(this.props.searchBy === SearchBy.genre
                  ? this.props.genreName
                  : 'recently added'
                ).toLowerCase()}{' '}
                again
              </button>
            </form>
          </div>
          <div
            className="image-section d-flex justify-content-center align-items-center pl-4"
            style={{ minWidth: '250px' }}
          >
            <MovieContentImage image={image!} title={title!} />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieContent;
