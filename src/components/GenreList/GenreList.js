import React from "react";
import PropTypes from "prop-types";
import Unogs from "../../util/Unogs";

class GenreList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			genreResults: [],
			requestLoading: false
		};
		this.genresArray = [
			"All Action",
			"Adventures",
			"All Anime",
			"All Childrens",
			"All Classics",
			"All Comedies",
			"Crime Documentaries",
			"Crime Films",
			"All Cult",
			"All Documentaries",
			"All Dramas",
			"All Faith and Spirituality",
			"Fantasy Movies",
			"All Gay and Lesbian",
			"All Horror",
			"All Independent",
			"All International",
			"All Music",
			"All Musicals",
			"Mysteries",
			"All Romance",
			"All Sci-Fi",
			"All Sports",
			"Stand-up Comedy",
			"All Thrillers"];
	}

	componentDidMount() {
		this.setState({ requestLoading: true }, () => {
			Unogs.getData("genre").then(response => {
				this.setState({ genreResults: response.ITEMS, requestLoading: false });
			}).catch(e => console.log(e));
		});
	}

	loadingGenres() {
		return [<option value="loading" key="loading">Loading...</option>, <option value="sizer" key="sizer">Faith and Spirituality</option>];
	}

	renderGenres() {
		if (!this.state.genreResults || !this.state.genreResults.length) {
			return <option value="Error" key="Error">Server Error</option>;
		} else {
			let optionsArr = [<option value="X" key="X">Choose genre...</option>, <option value="random" key="random">All Genres</option>];
			// eslint-disable-next-line no-unused-vars
			for (let genre of this.genresArray) {
				// eslint-disable-next-line no-unused-vars
				for (let genreObj of this.state.genreResults) {
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
		if (this.props.searchBy === "recent") { atts.disabled = true; atts.style = {backgroundColor: "rgb(66, 66, 66)", borderColor: "rgb(66, 66, 66)", color: "rgba(0, 0, 0, 0.3)"}; atts2.style = {opacity: "0.2"}; }
		return (
			<div className="form-group-row">
				<label htmlFor="genre-list" className="col-sm-12 col-form-label col-form-label-sm" {...atts2}>Select a Genre</label>
				<div className="col-sm-12 mx-auto mb-3">
					<select onChange={this.props.handleGenreChange} id="genre-list" className="custom-select custom-select-sm" {...atts}>
						{this.state.requestLoading ? this.loadingGenres() : this.renderGenres()}
					</select>
				</div>
			</div>
		);
	}
}

GenreList.propTypes = {
	handleGenreChange: PropTypes.func,
	searchBy: PropTypes.string,
	allGenreCodes: PropTypes.array
};

export default GenreList;