import React from 'react';
import PropTypes from 'prop-types';
import '../css/MovieContent.css';
import MovieContentItem from './MovieContentItem';
import MovieContentImage from './MovieContentImage';

const decodeHtml = html => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

class MovieContent extends React.Component {
  renderInfoItems() {
    const infoItems = {
      Runtime: this.props.movie.runtime,
      Released: this.props.movie.released,
      Rating: this.props.movie.rating
    };

    return Object.keys(infoItems).map(keyName => {
      let val = infoItems[keyName];
      return <MovieContentItem key={keyName} keyName={keyName} val={val} />;
    });
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
                <MovieContentImage image={image} title={title} />
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
                {(this.props.searchBy === 'genre'
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
            <MovieContentImage image={image} title={title} />
          </div>
        </div>
      </div>
    );
  }
}

MovieContent.propTypes = {
  movie: PropTypes.object,
  clearCurrentMovie: PropTypes.func,
  handleSearch: PropTypes.func,
  searchBy: PropTypes.string,
  genreName: PropTypes.string
};

export default MovieContent;
