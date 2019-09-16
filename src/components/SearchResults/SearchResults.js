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

	render() {
		let results;
		if (this.props.movie.title) {
			results = (
				<div className="row App text-white position-absolute text-center d-flex flex-column justify-content-center align-items-center">
					<div className="col-5 overlay d-flex flex-column p-4 justify-content-center align-items-center animate-fade-in">
						<div className="row justify-content-center">
							<div className="col-7 overlay movie-info text-left d-flex flex-column justify-content-around">
								<h2 className="text-center">{this.decodeHtml(this.props.movie.title || "")}</h2>
								<div>
									<h5 style={{ display: this.props.movie.synopsis ? "block" : "none" }}>Synopsis</h5>
									<p>{this.decodeHtml(this.props.movie.synopsis || "")}</p>
								</div>
								<div className="row d-flex justify-content-between">
									<div className="col-4">
										<h5 style={{ display: this.props.movie.runtime ? "block" : "none" }}>Runtime</h5>
										<p>{(this.props.movie.runtime || "").replace(/h/, "h ")}</p>
									</div>
									<div className="col-4">
										<h5 style={{ display: this.props.movie.released ? "block" : "none" }}>Released</h5>
										<p>{this.props.movie.released}</p>
									</div>
								</div>
								<button onClick={this.props.handleSearch} className="btn btn-light search-again">SEARCH {(this.props.searchBy === "genre" ? this.props.genreName : "Recently Added").toUpperCase()} AGAIN</button>
							</div>
							<div className="col-5 d-flex justify-content-center align-items-center">
								<div className="image-spinner position-absolute d-flex justify-content-center align-items-center" width="250px" height="351px">
									<div className="spinner-border" role="status">
										<span className="sr-only">Loading...</span>
									</div>
								</div>
								<div className="position-absolute">
									<img id="loading" src="" alt="" width="250px"></img>
								</div>
							</div>
						</div>
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
	searchBy: PropTypes.string
};

export default SearchResults;


