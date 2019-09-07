import React from "react";
import "./App.css";
import GenreSearch from "../GenreSearch/GenreSearch";
import RecentSearch from "../RecentSearch/RecentSearch";
import Home from "../Home/Home";
import SearchResults from "../SearchResults/SearchResults";
import Unogs from "../../util/Unogs";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: {},
			movie: {},
			country: "46",
			countryName: "United Kingdom",
			loading: false,
			countryPicked: true
		};
		this.search = this.search.bind(this);
		this.randomizeMovie = this.randomizeMovie.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.toggleCountryPicked = this.toggleCountryPicked.bind(this);
	}

	search(genre) {
		let input = genre ? genre : this.state.countryName;

		const setMovieState = () => {
			if (!this.state.searchResults[input] || !this.state.searchResults[input].length) {
				this.setState({ movie: { empty: true }, loading: false });
			} else {
				console.log(`Found: ${this.state.searchResults[input].length} ${genre ? "" : "recent"} movies ${genre ? "for this genre" : ""}`);
				this.setState({ movie: this.randomizeMovie(input), loading: false });
			}
		};

		this.setState({ movie: {}, loading: true }, () => {
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

	randomizeMovie(input) {
		let moviesArr = this.state.searchResults[input];
		return moviesArr[Math.floor(Math.random() * moviesArr.length)];
	}

	handleCountryChange(event) {
		this.setState({ country: event.target.value, countryName: event.target.options[event.target.selectedIndex].text });
	}

	toggleCountryPicked() {
		this.setState({ countryPicked: true });
	}

	render() {
		let page;

		if (!this.state.countryPicked) {
			page = (
				<Home
					country={this.state.country}
					toggleCountryPicked={this.toggleCountryPicked}
					onCountry={this.handleCountryChange} />
			);
		} else {
			page = (
				<div>
					<h3>{this.state.countryName}</h3>
					<GenreSearch
						onSearch={this.search}
						loading={this.state.loading} />
					<RecentSearch
						onSearch={this.search}
						loading={this.state.loading} />
					<SearchResults movie={this.state.movie} />
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row App text-white position-absolute text-center d-flex justify-content-center align-items-center">
					{page}
				</div>
			</div>
		);
	}
}

export default App;