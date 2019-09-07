import React from "react";
import "./App.css";
import Search from "../Search/Search";
import Home from "../Home/Home";
import Unogs from "../../util/Unogs";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: {},
			movie: {},
			country: "X",
			countryName: "",
			loading: false,
			countryPicked: false
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
		return (
			<div className="container">
				<div className="row App text-white position-absolute text-center d-flex justify-content-center align-items-center">
					<Home
						country={this.state.country}
						countryPicked={this.state.countryPicked}
						toggleCountryPicked={this.toggleCountryPicked}
						onCountry={this.handleCountryChange} />
					<Search
						onSearch={this.search}
						countryPicked={this.state.countryPicked}
						loading={this.state.loading}
						countryName={this.state.countryName}
						movie={this.state.movie} />
				</div>
			</div>
		);
	}
}

export default App;