import React from "react";
import PropTypes from "prop-types";
import MovieContent from "./MovieContent";
import Spinner from "./Spinner";
import AppRow from "./AppRow";
import "./SearchResults.css";

class SearchResults extends React.Component {

	renderContent() {
		if (!this.props.loadingResults) {
			return (
				<MovieContent
					movie={this.props.movie}
					loadingResults={this.props.loadingResults}
					clearCurrentMovie={this.props.clearCurrentMovie}
					handleSearch={this.props.handleSearch}
					searchBy={this.props.searchBy}
					genreName={this.props.genreName}
				/>
			);
		} else {
			return (
				<div className="netflix-color p-3 mt-2 p-sm-5 m-sm-5">
					<span className="h2 pr-3">Loading</span>
					<Spinner display={true} />
				</div>
			);
		}
	}

	renderAll() {
		if (this.props.movie.empty) {
			return (
				<AppRow>
					<div className="col-auto overlay netflix-color p-5 animate-fade-in">
						<p className="h4">No Results Found</p>
					</div>
				</AppRow>
			);
		} else if (this.props.movie.title) {
			return (
				<AppRow>
					<div className="col-auto overlay d-flex flex-column px-4 pb-4 justify-content-center align-items-center animate-fade-in">
						{this.renderContent()}
					</div>
				</AppRow>
			);
		} else {
			return null;
		}
	}

	render() {
		return this.renderAll();
	}
}

SearchResults.propTypes = {
	movie: PropTypes.object,
	genreName: PropTypes.string,
	handleSearch: PropTypes.func,
	searchBy: PropTypes.string,
	loadingResults: PropTypes.bool,
	clearCurrentMovie: PropTypes.func
};

export default SearchResults;


