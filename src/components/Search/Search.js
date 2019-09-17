import React from "react";
import PropTypes from "prop-types";
import GenreList from "../GenreList/GenreList";
import Unogs from "../../util/Unogs";
import "./Search.css";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			genreResults: []
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
	}

	componentDidMount() {
		Unogs.getData("genre").then(response => {
			this.setState({ genreResults: response.ITEMS });
		}).catch(e => console.log(e));
	}

	getSearchByClass(searchByOption) {
		return this.props.searchBy === searchByOption ? " active" : "";
	}

	renderSearchByOptions() {
		return Object.keys(this.searchByOptions).map(searchByOption => {
			let searchByOptionValue = this.searchByOptions[searchByOption];
			return <li
				key={searchByOptionValue}
				className={"search-by list-group-item w-100" + this.getSearchByClass(searchByOptionValue)}
				onClick={this.props.changeSearchBy.bind(this, searchByOptionValue)}
			>
				{searchByOption}
			</li>;
		});
	}

	renderButton() {
		let atts = {};
		if (this.props.genre === "X" && this.props.searchBy === "genre") { atts.disabled = true; atts.title = "Choose genre"; }
		return <span {...atts}>
			<button onClick={this.props.handleSearch} className="btn" {...atts}>Search Netflix</button>
		</span>;
	}

	render() {
		return this.props.countryPicked && !this.props.movie.title && (
			<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
				<div className="col-4 overlay d-flex flex-column p-4 justify-content-center align-items-center animate-fade-in">
					<form className="w-100">
						<label className="col-form-label col-form-label-sm">Search By...</label>
						<ul className="col-9 list-group list-group-horizontal mx-auto mb-1">
							{this.renderSearchByOptions()}
						</ul>
						<GenreList
							searchBy={this.props.searchBy}
							allGenreCodes={this.props.allGenreCodes}
							handleGenreChange={this.props.handleGenreChange}
							genresArray={this.genresArray}
							genreResults={this.state.genreResults} />
						{this.renderButton()}
					</form>
				</div>
			</div>
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
	genre: PropTypes.string
};

export default Search;