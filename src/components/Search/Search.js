import React from "react";
import PropTypes from "prop-types";
import CountryLogo from "../CountryLogo/CountryLogo";
import GenreList from "../GenreList/GenreList";
import SearchResults from "../SearchResults/SearchResults";
import "./Search.css";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBy: "genre",
			genre: "X"
		};
		this.searchByOptions = {
			"Genre": "genre",
			"Recently Added": "recent"
		};
		this.allGenreCodes = [];
		this.handleSearchByChange = this.handleSearchByChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	getSearchByClass(searchByOption) {
		if (this.state.searchBy === searchByOption) {
			return " active";
		} else {
			return "";
		}
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
		event.preventDefault();
	}

	renderSearchByOptions() {
		return Object.keys(this.searchByOptions).map(searchByOption => {
			let searchByOptionValue = this.searchByOptions[searchByOption];
			return <li
				key={searchByOptionValue}
				className={"search-by list-group-item" + this.getSearchByClass(searchByOptionValue)}
				onClick={this.handleSearchByChange.bind(this, searchByOptionValue)}
			>
				{searchByOption}
			</li>;
		});
	}

	renderButton() {
		let atts = {};
		if (this.state.genre === "X" && this.state.searchBy === "genre") { atts.disabled = true; }
		if (this.props.loading) {
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
		return this.props.countryPicked && (
			<div>
				<CountryLogo
					toggleCountryPicked={this.props.toggleCountryPicked}
					countryName={this.props.countryName} />
				<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
					<div className="col-4 d-flex flex-column p-4 justify-content-center align-items-center animate-fade-in" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
						<form>
							<label className="col-sm-12 col-form-label col-form-label-sm">Search By...</label>
							<ul className="list-group list-group-horizontal">
								{this.renderSearchByOptions()}
							</ul>
							<GenreList
								searchBy={this.state.searchBy}
								allGenreCodes={this.allGenreCodes}
								handleGenreChange={this.handleGenreChange} />
							{this.renderButton()}
						</form>
						<SearchResults movie={this.props.movie} />
					</div>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func,
	loading: PropTypes.bool,
	countryName: PropTypes.string,
	movie: PropTypes.object,
	countryPicked: PropTypes.bool,
	toggleCountryPicked: PropTypes.func
};

export default Search;