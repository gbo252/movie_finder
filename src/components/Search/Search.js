import React from "react";
import PropTypes from "prop-types";
import GenreList from "../GenreList/GenreList";
import Unogs from "../../util/Unogs";
import "./Search.css";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBy: "genre",
			genre: "X",
			genreResults: [],
			loadingGenres: false,
			loadingSearchResults: false,
			animate: false
		};
		this.searchByOptions = {
			"Genre": "genre",
			"Recently Added": "recent"
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
		this.allGenreCodes = [];
		this.handleSearchByChange = this.handleSearchByChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this.setState({ loadingGenres: true }, () => {
			Unogs.getData("genre").then(response => {
				this.setState({ genreResults: response.ITEMS, loadingGenres: false });
			}).catch(e => console.log(e));
		});
	}

	getSearchByClass(searchByOption) {
		return this.state.searchBy === searchByOption ? " active" : "";
	}

	handleSearchByChange(searchByOption) {
		this.setState({ searchBy: searchByOption });
	}

	handleGenreChange(event) {
		this.setState({ genre: event.target.value });
	}

	randomGenreCode() {
		return this.allGenreCodes[Math.floor(Math.random() * this.allGenreCodes.length)];
	}

	handleSearch(event) {
		this.setState({ loadingSearchResults: true }, () => {
			setTimeout(() => {
				if (this.state.searchBy === "genre") {
					if (this.state.genre === "random") {
						let code = this.randomGenreCode();
						this.props.onSearch(code);
					} else {
						this.props.onSearch(this.state.genre);
					}
				} else if (this.state.searchBy === "recent") {
					this.props.onSearch();
				}
			}, 1000);
			setTimeout(() => {
				this.setState({ animate: true });
			}, 2000);
			setTimeout(() => {
				this.setState({ loadingSearchResults: false, animate: false });
			}, 12000);
		});
		event.preventDefault();
	}

	renderSearchByOptions() {
		return Object.keys(this.searchByOptions).map(searchByOption => {
			let searchByOptionValue = this.searchByOptions[searchByOption];
			return <li
				key={searchByOptionValue}
				className={"search-by list-group-item w-100" + this.getSearchByClass(searchByOptionValue)}
				onClick={this.handleSearchByChange.bind(this, searchByOptionValue)}
			>
				{searchByOption}
			</li>;
		});
	}

	renderButton() {
		let atts = {};
		if (this.state.genre === "X" && this.state.searchBy === "genre") { atts.disabled = true; atts.title = "Choose genre"; }
		if (this.state.loadingSearchResults) {
			return <button className="btn" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Loading...
			</button>;
		} else {
			return <span {...atts}>
				<button onClick={this.handleSearch} className="btn" {...atts}>Search Netflix</button>
			</span>;
		}
	}

	render() {
		return this.props.countryPicked && !this.props.movie.title && (
			<div>
				<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
					<div className={"col-4 overlay d-flex flex-column p-4 justify-content-center align-items-center animate-fade-in" + (this.state.animate ? " animate-off-screen-hold" : "")}>
						<form className="w-100">
							<label className="col-form-label col-form-label-sm">Search By...</label>
							<ul className="col-9 list-group list-group-horizontal mx-auto mb-1">
								{this.renderSearchByOptions()}
							</ul>
							<GenreList
								searchBy={this.state.searchBy}
								allGenreCodes={this.allGenreCodes}
								handleGenreChange={this.handleGenreChange}
								loadingGenres={this.state.loadingGenres}
								genresArray={this.genresArray}
								genreResults={this.state.genreResults} />
							{this.renderButton()}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func,
	loadingResults: PropTypes.bool,
	movie: PropTypes.object,
	countryPicked: PropTypes.bool
};

export default Search;