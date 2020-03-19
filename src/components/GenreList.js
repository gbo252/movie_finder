import React from "react";
import PropTypes from "prop-types";

class GenreList extends React.Component {

	renderGenres() {
		if (!this.props.genreResults || !this.props.genreResults.length) {
			return <option value="Error" key="Error">Server Error</option>;
		} else {
			let optionsArr = [<option value="X" key="X">Choose genre...</option>, <option value="random" key="random">All Genres</option>];
			for (let genre of this.props.genresArray) {
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

	renderAtts(section) {
		let atts = {};
		if (this.props.searchBy === "recent") {
			if (section === "label") {
				atts.style = { opacity: "0.2" };
			} else {
				atts.disabled = true;
				atts.style = { backgroundColor: "rgb(66, 66, 66)", borderColor: "rgb(66, 66, 66)", color: "rgba(0, 0, 0, 0.3)" };
			}
		}
		return atts;
	}

	render() {
		return (
			<div className="form-group-row">
				<label htmlFor="genre-list" {...this.renderAtts("label")}>
					Select a Genre
				</label>
				<div className="col-auto mx-auto mb-3">
					<select onChange={this.props.handleGenreChange} id="genre-list" className="custom-select custom-select-sm" {...this.renderAtts("select")}>
						{this.renderGenres()}
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
	genresArray: PropTypes.array,
	genreResults: PropTypes.array
};

export default GenreList;