import React from 'react';
import { SearchBy } from '../types';

type Props = {
  handleGenreChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  searchBy: SearchBy;
  allGenreCodes: number[][];
  genresArray: string[];
  genreResults: { [key: string]: number[] }[];
};

class GenreList extends React.Component<Props> {
  renderGenres() {
    if (!this.props.genreResults || !this.props.genreResults.length) {
      return (
        <option value="Error" key="Error" data-testid="server-error">
          Server Error
        </option>
      );
    } else {
      let optionsArr = [
        <option value="X" key="X" data-testid="choose-genre-option">
          Choose genre...
        </option>,
        <option value="random" key="random">
          All Genres
        </option>
      ];
      for (let genre of this.props.genresArray) {
        for (let genreObj of this.props.genreResults) {
          if (Object.prototype.hasOwnProperty.call(genreObj, genre)) {
            const genreCode = genreObj[genre];
            this.props.allGenreCodes.push(genreCode);
            optionsArr.push(
              <option
                value={genreCode.toString()}
                key={genreCode.toString()}
                data-testid="genre-options"
              >
                {genre
                  .replace(/(^All\s)|(\sFilms$)|(\sMovies$)/g, '')
                  .replace(/ies$/, 'y')
                  .replace(/s$/, '')}
              </option>
            );
          }
        }
      }
      return optionsArr;
    }
  }

  renderAtts(section: string) {
    const atts: { disabled?: boolean; style?: { [key: string]: string } } = {};
    if (this.props.searchBy === SearchBy.recent) {
      switch (section) {
        case 'label':
          atts.style = { opacity: '0.2' };
          break;
        case 'select':
          atts.disabled = true;
          atts.style = {
            backgroundColor: 'rgb(66, 66, 66)',
            borderColor: 'rgb(66, 66, 66)',
            color: 'rgba(0, 0, 0, 0.3)'
          };
          break;
        default:
          return;
      }
    }
    return atts;
  }

  render() {
    return (
      <div className="form-group-row">
        <label htmlFor="genre-list" {...this.renderAtts('label')}>
          Select a Genre
        </label>
        <div className="col-auto mx-auto mb-3">
          <select
            onChange={this.props.handleGenreChange}
            id="genre-list"
            className="custom-select custom-select-sm"
            {...this.renderAtts('select')}
            data-testid="genre-select"
          >
            {this.renderGenres()}
          </select>
        </div>
      </div>
    );
  }
}

export default GenreList;
