import React from "react";
import PropTypes from "prop-types";
import GenreList from "./GenreList";
import Unogs from "../apis/Unogs";
import netflixLogo from "../images/netflix_logo.png";
import AppRow from "./AppRow";
import "./Search.css";

class Search extends React.Component {

	state = { genreResults: [] };

	searchByOptions = {
		"Genre": "genre",
		"Recently Added": "recent"
	};

	genresArray = [
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

	componentDidMount() {
		Unogs.getData("genre").then(response => {
			this.setState({ genreResults: response.ITEMS });
		});
	}

	renderSearchByOptions() {
		return Object.keys(this.searchByOptions).map(searchByOption => {
			let searchByOptionValue = this.searchByOptions[searchByOption];
			return (
				<li
					key={searchByOptionValue}
					className={"search-by list-group-item p-1" + (this.props.searchBy === searchByOptionValue ? " active" : "")}
					onClick={this.props.changeSearchBy.bind(this, searchByOptionValue)}>
					{searchByOption}
				</li>
			);
		});
	}

	renderButton() {
		let atts = {};
		if (this.props.genre === "X" && this.props.searchBy === "genre") { atts.disabled = true; atts.title = "Choose genre"; }
		return (
			<span {...atts}>
				<button onClick={this.props.handleSearch} className="btn" {...atts}>Search Netflix</button>
			</span>
		);
	}

	render() {
		return this.props.countryPicked && !this.props.movie.title && (
			<AppRow>
				<div className="col-auto overlay d-flex flex-column p-4 justify-content-center align-items-center animate-fade-in">
					<div className="country-logo-inc mb-2 px-4 py-1 rounded">
						<img src={netflixLogo} alt="netflix logo" width="100px" />
						<h5 id="country-name" className="mt-1 mb-0" onClick={this.props.toggleCountryPicked} title="click to change Country">
							{this.props.countryName}
						</h5>
					</div>
					<form className="w-100">
						<label htmlFor="search-by-options">Search By</label>
						<ul id="search-by-options" className="list-group list-group-horizontal-sm mb-2">
							{this.renderSearchByOptions()}
						</ul>
						<GenreList
							searchBy={this.props.searchBy}
							allGenreCodes={this.props.allGenreCodes}
							handleGenreChange={this.props.handleGenreChange}
							genresArray={this.genresArray}
							genreResults={this.state.genreResults}
						/>
						{this.renderButton()}
					</form>
				</div>
			</AppRow>
		);
	}
}

Search.propTypes = {
	movie: PropTypes.object,
	countryPicked: PropTypes.bool,
	changeSearchBy: PropTypes.func,
	searchBy: PropTypes.string,
	handleSearch: PropTypes.func,
	handleGenreChange: PropTypes.func,
	allGenreCodes: PropTypes.array,
	genre: PropTypes.string,
	countryName: PropTypes.string,
	toggleCountryPicked: PropTypes.func
};

export default Search;