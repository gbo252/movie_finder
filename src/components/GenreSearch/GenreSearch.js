import React from "react";
import PropTypes from "prop-types";
import Unogs from "../../util/Unogs";

class GenreSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			genre: "X",
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
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this.setState({ requestLoading: true }, () => {
			Unogs.getData("genre").then(response => {
				this.setState({ genreResults: response.ITEMS, requestLoading: false });
			}).catch(e => console.log(e));
		});
	}

	handleGenreChange(event) {
		this.setState({ genre: event.target.value });
	}

	handleSearch(event) {
		this.props.onSearch(this.state.genre);
		event.preventDefault();
	}

	renderButton() {
		let atts = {};
		if (this.state.genre === "X") { atts.disabled = true; atts.title = "Select a genre"; }
		if (this.props.loading) {
			return <button className="btn btn-danger" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
			</button>;
		} else {
			return <span {...atts}>
				<button onClick={this.handleSearch} className="btn btn-danger" {...atts}>Find Movie</button>
			</span>;
		}
	}

	loadingGenres() {
		return <option value={"loading"} key={"loading"}>Loading...</option>;
	}

	renderGenres() {
		if (!this.state.genreResults || !this.state.genreResults.length) {
			return <option value={"Error"} key={"Error"}>Server Error</option>;
		} else {
			let optionsArr = [];
			optionsArr.push(<option value="X" key="X">Choose genre...</option>);
			// eslint-disable-next-line no-unused-vars
			for (let genre of this.genresArray) {
				// eslint-disable-next-line no-unused-vars
				for (let genreObj of this.state.genreResults) {
					if (Object.prototype.hasOwnProperty.call(genreObj, genre)) {
						let genreCode = genreObj[genre];
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
		return (
			<form className="col-3 mx-auto">
				<div className="form-group">
					<label htmlFor="genre-list">Select a Genre</label>
					<select onChange={this.handleGenreChange} id="genre-list" className="form-control">
						{this.state.requestLoading ? this.loadingGenres() : this.renderGenres()}
					</select>
				</div>
				{this.renderButton()}
			</form>
		);
	}
}

GenreSearch.propTypes = {
	onSearch: PropTypes.func,
	loading: PropTypes.bool
};

export default GenreSearch;









