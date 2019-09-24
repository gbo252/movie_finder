import React from "react";
import "./App.css";
import Search from "./Search";
import Home from "./Home";
import CountryLogo from "./CountryLogo";
import SearchResults from "./SearchResults";
import Unogs from "../apis/Unogs";

class App extends React.Component {

	state = {
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

	allGenreCodes = [];

	handleSearch = (event) => {

		const search = (genre) => {
			const searchResults = this.state.searchResults;
			let input = genre ? genre : this.state.countryName;

			const randomizeMovie = (input) => {
				let moviesArr = searchResults[input];
				return moviesArr[Math.floor(Math.random() * moviesArr.length)];
			};

			const setMovieState = () => {
				if (!searchResults[input] || !searchResults[input].length) {
					this.setState({ movie: { empty: true, title: " " }, loadingResults: false }, () => {
						setTimeout(() => {
							this.setState({ movie: {} });
						}, 2000);
					});
				} else {
					console.log(`Found: ${searchResults[input].length} ${genre ? this.state.genreName : "recent"} movies`);
					this.setState({ movie: randomizeMovie(input), loadingResults: false });
				}
			};

			this.setState({ movie: { title: " " }, loadingResults: true }, () => {
				if (searchResults[input]) {
					setTimeout(() => {
						setMovieState();
					}, 1500);
				} else {
					Unogs.search(this.state.country, genre ? genre : null).then(response => {
						let searchObj = searchResults;
						searchObj[input] = response;
						this.setState({ searchResults: searchObj }, () => {
							setMovieState();
						});
					}).catch(e => console.log(e));
				}
			});
		};

		if (this.state.searchBy === "genre") {
			if (this.state.genre === "random") {
				let code = this.allGenreCodes[Math.floor(Math.random() * this.allGenreCodes.length)];
				search(code);
			} else {
				search(this.state.genre);
			}
		} else if (this.state.searchBy === "recent") {
			search();
		}

		event.preventDefault();

	}

	handleGenreChange = (event) => {
		this.setState({ genre: event.target.value, genreName: event.target.options[event.target.selectedIndex].text });
	}

	handleCountryChange = (event) => {
		this.setState({ country: event.target.value, countryName: event.target.options[event.target.selectedIndex].text });
	}

	handleSearchByChange = (searchByOption) => {
		this.setState({ searchBy: searchByOption });
	}

	toggleCountryPicked = () => {
		this.setState({ countryPicked: !this.state.countryPicked, movie: {}, searchResults: {} });
	}

	clearCurrentMovie = () => {
		this.setState({ movie: {}, genre: "X" });
	}

	render() {
		return (
			<div className="container">
				<Home
					country={this.state.country}
					countryPicked={this.state.countryPicked}
					toggleCountryPicked={this.toggleCountryPicked}
					onCountry={this.handleCountryChange}
				/>
				<Search
					countryPicked={this.state.countryPicked}
					movie={this.state.movie}
					changeSearchBy={this.handleSearchByChange}
					searchBy={this.state.searchBy}
					genre={this.state.genre}
					handleSearch={this.handleSearch}
					handleGenreChange={this.handleGenreChange}
					allGenreCodes={this.allGenreCodes}
					toggleCountryPicked={this.toggleCountryPicked}
					countryName={this.state.countryName}
				/>
				<SearchResults
					movie={this.state.movie}
					genreName={this.state.genreName}
					searchBy={this.state.searchBy}
					handleSearch={this.handleSearch}
					loadingResults={this.state.loadingResults}
					clearCurrentMovie={this.clearCurrentMovie}
				/>
				<CountryLogo
					toggleCountryPicked={this.toggleCountryPicked}
					countryPicked={this.state.countryPicked}
					countryName={this.state.countryName}
				/>
			</div>
		);
	}
}

export default App;