import React from "react";
import PropTypes from "prop-types";
import MovieContent from "../MovieContent/MovieContent";
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
				<div className="row justify-content-center">
					<div className="col-5 d-flex justify-content-center align-items-center">
						<div className="image-spinner d-flex justify-content-center align-items-center" width="250px" height="351px">
							<p className="h2 netflix-color pr-3 pt-1">Loading</p>
							<div className="spinner-border netflix-color" style={{ width: "3rem", height: "3rem" }} role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	renderAll() {
		if (this.props.movie.empty) {
			return (
				<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
					<div className="col-5 overlay d-flex flex-column px-4 pb-4 justify-content-center align-items-center animate-fade-in">
						<p className="h4">No Results Found</p>
					</div>
				</div>
			);
		} else if (this.props.movie.title) {
			return (
				<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
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


