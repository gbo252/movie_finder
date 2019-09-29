import React from "react";
import "../css/App.css";
import Search from "./Search";
import GenreList from "./GenreList";
import Home from "./Home";
import CountryLogo from "./CountryLogo";
import SearchResults from "./SearchResults";
import MovieContent from "./MovieContent";
import Unogs from "../apis/Unogs";

class App extends React.Component {

	state = {
		searchResults: {},
		movie: {},
		loadingResults: false,
		searchBy: "genre",
		genreName: "",
		genre: "X",
		genreResults: [],
		country: "X",
		countryName: "",
		countryPicked: false
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
		"All Thrillers"
	];

	allGenreCodes = [];

	componentDidMount() {
		Unogs.getData("genre").then(response => {
			this.setState({ genreResults: response.ITEMS });
		});
	}

	handleSearch = (event) => {

		const { searchResults, countryName, genreName, country, searchBy, genre } = this.state;

		let input;
		if (searchBy === "genre") {
			input = (genre === "random" ? this.allGenreCodes[Math.floor(Math.random() * this.allGenreCodes.length)] : genre);
		} else if (searchBy === "recent") {
			input = countryName;
		}

		const setMovieState = () => {
			if (!searchResults[input] || !searchResults[input].length) {
				this.setState({ movie: { empty: true, title: " " }, loadingResults: false }, () => {
					setTimeout(() => {
						this.setState({ movie: {} });
					}, 2000);
				});
			} else {
				console.log(`Found: ${searchResults[input].length} ${searchBy === "genre" ? genreName : "recent"} movies`);
				this.setState({
					movie: searchResults[input][Math.floor(Math.random() * searchResults[input].length)],
					loadingResults: false
				});
			}
		};

		this.setState({ movie: { title: " " }, loadingResults: true }, () => {
			if (searchResults[input]) {
				setTimeout(() => {
					setMovieState();
				}, 1500);
			} else {
				Unogs.search(country, (searchBy === "genre" ? input : null)).then(response => {
					let searchObj = searchResults;
					searchObj[input] = response;
					this.setState({ searchResults: searchObj }, () => {
						setMovieState();
					});
				});
			}
		});

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
		const { country, countryName, countryPicked, movie, searchBy, genre, genreName, genreResults, loadingResults } = this.state;

		return (
			<div className="container">

				<Home
					country={country}
					countryPicked={countryPicked}
					toggleCountryPicked={this.toggleCountryPicked}
					onCountry={this.handleCountryChange}
				/>

				<Search
					countryPicked={countryPicked}
					movie={movie}
					changeSearchBy={this.handleSearchByChange}
					searchBy={searchBy}
					genre={genre}
					handleSearch={this.handleSearch}
					toggleCountryPicked={this.toggleCountryPicked}
					countryName={countryName}
				>
					<GenreList
						searchBy={searchBy}
						allGenreCodes={this.allGenreCodes}
						handleGenreChange={this.handleGenreChange}
						genresArray={this.genresArray}
						genreResults={genreResults}
					/>
				</Search>

				<SearchResults
					movie={movie}
					loadingResults={loadingResults}
				>
					<MovieContent
						movie={movie}
						loadingResults={loadingResults}
						clearCurrentMovie={this.clearCurrentMovie}
						handleSearch={this.handleSearch}
						searchBy={searchBy}
						genreName={genreName}
					/>
				</SearchResults>

				<CountryLogo
					toggleCountryPicked={this.toggleCountryPicked}
					countryPicked={countryPicked}
					countryName={countryName}
				/>

			</div>
		);
	}
}

export default App;