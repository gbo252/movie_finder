import React from "react";
import PropTypes from "prop-types";

class GenreList extends React.Component {
	loadingGenres() {
		return [<option value="loading" key="loading">Loading...</option>, <option value="sizer" key="sizer">Faith and Spirituality</option>];
	}

	renderGenres() {
		if (!this.props.genreResults || !this.props.genreResults.length) {
			return <option value="Error" key="Error">Server Error</option>;
		} else {
			let optionsArr = [<option value="X" key="X">Choose genre...</option>, <option value="random" key="random">All Genres</option>];
			// eslint-disable-next-line no-unused-vars
			for (let genre of this.props.genresArray) {
				// eslint-disable-next-line no-unused-vars
				for (let genreObj of this.props.genreResults) {
					if (Object.prototype.hasOwnProperty.call(genreObj, genre)) {
						let genreCode = genreObj[genre];
						this.props.allGenreCodes.push(genreCode);
						optionsArr.push(<option value={genreCode} key={genreCode}>
							{genre.replace(/^All\s/, "").replace(/\sFilms$/, "").replace(/\sMovies$/, "").replace(/ies$/, "y").replace(/s$/, "")}
						</option>);
					}
				}
			}
			return optionsArr;
		}
	}

	render() {
		let atts = {};
		let atts2 = {};
		if (this.props.searchBy === "recent") { atts.disabled = true; atts.style = { backgroundColor: "rgb(66, 66, 66)", borderColor: "rgb(66, 66, 66)", color: "rgba(0, 0, 0, 0.3)" }; atts2.style = { opacity: "0.2" }; }
		return (
			<div className="form-group-row">
				<label htmlFor="genre-list" className="col-sm-12 col-form-label col-form-label-sm" {...atts2}>Select a Genre</label>
				<div className="col-sm-12 mx-auto mb-3">
					<select onChange={this.props.handleGenreChange} id="genre-list" className="custom-select custom-select-sm" {...atts}>
						{this.props.requestLoading ? this.loadingGenres() : this.renderGenres()}
					</select>
				</div>
			</div>
		);
	}
}

GenreList.propTypes = {
	handleGenreChange: PropTypes.func,
	searchBy: PropTypes.string,
	allGenreCodes: PropTypes.array,
	requestLoading: PropTypes.bool,
	genresArray: PropTypes.array,
	genreResults: PropTypes.array
};

export default GenreList;