import React from "react";
import "./App.css";
import Search from "../Search/Search";
import Home from "../Home/Home";
import CountryLogo from "../CountryLogo/CountryLogo";
import SearchResults from "../SearchResults/SearchResults";
import Unogs from "../../util/Unogs";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: {},

			movie: {
				// download: "0",
				// image: "https://occ-0-2773-2774.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABfOwM141kECAfjwSsXkXuVNSoNbJRAMaSddjH6b15acGMt4-sPQlmmE99tsPa6dabje-RXz28A0lODn3l6cj0QFeAEl3Ay0.jpg?r=aed",
				// imdbid: "",
				// largeimage: "",
				// netflixid: "81151880",
				// rating: "4",
				// released: "2019",
				// runtime: "1h37m",
				// synopsis: "As a series of murders hit close to home, a video game designer with post-traumatic stress must confront her demons, or risk becoming their victim.",
				// title: "Game Over (Hindi Version)",
				// type: "movie",
				// unogsdate: "2019-08-21"
			},

			loadingResults: false,
			genreName: "",
			searchBy: "genre",
			genre: "X",

			// country: "46",
			// countryName: "United Kingdom",
			// countryPicked: true
			country: "X",
			countryName: "",
			countryPicked: false
		};
		this.allGenreCodes = [];
		this.search = this.search.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.toggleCountryPicked = this.toggleCountryPicked.bind(this);
		this.handleSearchByChange = this.handleSearchByChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.clearCurrentMovie = this.clearCurrentMovie.bind(this);
	}

	search(genre) {
		let input = genre ? genre : this.state.countryName;

		const setMovieState = () => {
			if (!this.state.searchResults[input] || !this.state.searchResults[input].length) {
				this.setState({ movie: { empty: true }, loadingResults: false });
			} else {
				console.log(`Found: ${this.state.searchResults[input].length} ${genre ? "" : "recent"} movies ${genre ? "for this genre" : ""}`);
				this.setState({ movie: this.randomizeMovie(input), loadingResults: false });
			}
		};

		this.setState({ movie: { title: " " }, loadingResults: true }, () => {
			if (this.state.searchResults[input]) {
				setTimeout(() => {
					setMovieState();
				}, 1500);
			} else {
				Unogs.search(this.state.country, genre ? genre : null).then(response => {
					let searchObj = this.state.searchResults;
					searchObj[input] = response;
					this.setState({ searchResults: searchObj }, () => {
						setMovieState();
					});
				}).catch(e => console.log(e));
			}
		});
	}

	handleSearch(event) {
		if (this.state.searchBy === "genre") {
			if (this.state.genre === "random") {
				let code = this.randomGenreCode();
				this.search(code);
			} else {
				this.search(this.state.genre);
			}
		} else if (this.state.searchBy === "recent") {
			this.search();
		}

		event.preventDefault();
	}

	randomGenreCode() {
		return this.allGenreCodes[Math.floor(Math.random() * this.allGenreCodes.length)];
	}

	handleGenreChange(event) {
		this.setState({ genre: event.target.value, genreName: event.target.options[event.target.selectedIndex].text });
	}

	randomizeMovie(input) {
		let moviesArr = this.state.searchResults[input];
		return moviesArr[Math.floor(Math.random() * moviesArr.length)];
	}

	handleCountryChange(event) {
		this.setState({ country: event.target.value, countryName: event.target.options[event.target.selectedIndex].text });
	}

	handleSearchByChange(searchByOption) {
		this.setState({ searchBy: searchByOption });
	}

	toggleCountryPicked() {
		this.setState({ countryPicked: !this.state.countryPicked, movie: {} });
	}

	clearCurrentMovie() {
		this.setState({ movie: {} });
	}

	render() {
		return (
			<div>
				<Home
					country={this.state.country}
					countryPicked={this.state.countryPicked}
					toggleCountryPicked={this.toggleCountryPicked}
					onCountry={this.handleCountryChange} />
				<Search
					countryPicked={this.state.countryPicked}
					movie={this.state.movie}
					changeSearchBy={this.handleSearchByChange}
					searchBy={this.state.searchBy}
					genre={this.state.genre}
					handleSearch={this.handleSearch}
					handleGenreChange={this.handleGenreChange}
					allGenreCodes={this.allGenreCodes} />
				<CountryLogo
					toggleCountryPicked={this.toggleCountryPicked}
					countryPicked={this.state.countryPicked}
					countryName={this.state.countryName} />
				<SearchResults
					movie={this.state.movie}
					genreName={this.state.genreName}
					searchBy={this.state.searchBy}
					handleSearch={this.handleSearch}
					loadingResults={this.state.loadingResults}
					clearCurrentMovie={this.clearCurrentMovie} />
			</div>
		);
	}
}

export default App;