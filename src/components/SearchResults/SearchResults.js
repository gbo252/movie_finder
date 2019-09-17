import React from "react";
import PropTypes from "prop-types";
import "./SearchResults.css";

class SearchResults extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.movie !== prevProps.movie) {
			let image = document.getElementById("loading");
			let moviePoster = new Image();
			moviePoster.onload = function () {
				image.src = this.src;
			};
			moviePoster.src = this.props.movie.image;
			moviePoster.alt = this.props.movie.title;
		}
	}

	decodeHtml(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

	renderAll() {
		if (!this.props.loadingResults) {
			return <div>
				<div className="row">
					<button type="button" onClick={this.props.goBackToSearch} className="btn btn-link ml-n3 back-button netflix-color font-weight-bold">BACK</button>
				</div>
				<div className="row justify-content-center">
					<div className="col-7 overlay movie-info text-left d-flex flex-column justify-content-around">
						<h3 className="text-center">{this.decodeHtml(this.props.movie.title || "")}</h3>
						<div>
							<h5>Synopsis</h5>
							<p>{this.decodeHtml(this.props.movie.synopsis || "")}</p>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-4">
								<h5>Runtime</h5>
								<p>{(this.props.movie.runtime || "").replace(/h/, "h ")}</p>
							</div>
							<div className="col-4">
								<h5>Released</h5>
								<p>{this.props.movie.released}</p>
							</div>
						</div>
						<form className="mx-auto">
							<button onClick={this.props.handleSearch} className="btn search-again">search {(this.props.searchBy === "genre" ? this.props.genreName : "recently added").toLowerCase()} again</button>
						</form>
					</div>
					<div className="col-5 d-flex justify-content-center align-items-center">
						<div className="image-spinner position-absolute d-flex justify-content-center align-items-center" width="250px" height="351px">
							<div className="spinner-border netflix-color" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
						<div className="position-absolute">
							<img id="loading" src="" alt="" width="250px"></img>
						</div>
					</div>
				</div>
			</div>;
		} else {
			return <div className="row justify-content-center">
				<div className="col-5 d-flex justify-content-center align-items-center">
					<div className="image-spinner d-flex justify-content-center align-items-center" width="250px" height="351px">
						<p className="h2 netflix-color pr-3 pt-1">Loading</p>
						<div className="spinner-border netflix-color" style={{ width: "3rem", height: "3rem" }} role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				</div>
			</div>;
		}
	}

	render() {
		let results;
		if (this.props.movie.title) {
			results = (
				<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
					<div className="col-5 overlay d-flex flex-column px-4 pb-4 justify-content-center align-items-center animate-fade-in">
						{this.renderAll()}
					</div>
				</div>
			);
		} else if (this.props.movie.empty) {
			results = <p>No Results Found</p>;
		} else {
			results = null;
		}
		return results;
	}
}

SearchResults.propTypes = {
	movie: PropTypes.object,
	genreName: PropTypes.string,
	handleSearch: PropTypes.func,
	searchBy: PropTypes.string,
	loadingResults: PropTypes.bool,
	goBackToSearch: PropTypes.func
};

export default SearchResults;


