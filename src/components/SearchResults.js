import React from "react";
import PropTypes from "prop-types";
import MovieContent from "./MovieContent";
import Spinner from "./Spinner";
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
				<div className="netflix-color p-5 m-5">
					<span className="h2 pr-3">Loading</span>
					<Spinner />
				</div>
			);
		}
	}

	renderAll() {
		if (this.props.movie.empty) {
			return (
				<div className="row App text-white position-absolute text-center d-flex justify-content-center">
					<div className="col-5 overlay d-flex flex-column px-4 pb-4 justify-content-center align-items-center animate-fade-in">
						<p className="h4">No Results Found</p>
					</div>
				</div>
			);
		} else if (this.props.movie.title) {
			return (
				<div className="row App text-white position-absolute text-center d-flex justify-content-center">
					<div className="col-auto overlay d-flex flex-column px-4 pb-4 justify-content-center align-items-center animate-fade-in">
						{this.renderContent()}
					</div>
				</div>
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


