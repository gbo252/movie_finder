import React from "react";
import PropTypes from "prop-types";
import loading from "./loading.png";

class SearchResults extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.movie !== prevProps.movie) {
			// change this to be more exact..................................
			let image = document.images[1];
			let moviePoster = new Image();
			moviePoster.onload = function () {
				image.src = this.src;
			};
			moviePoster.src = this.props.movie.image;
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
				<div className="row d-flex justify-content-center align-content-center">
					<div className="col-5">
						<h3>{this.decodeHtml(this.props.movie.title || "")}</h3>
						<h5 style={{ display: this.props.movie.synopsis ? "block" : "none" }}>Synopsis:</h5><p>{this.decodeHtml(this.props.movie.synopsis || "")}</p>
						<h5 style={{ display: this.props.movie.runtime ? "block" : "none" }}>Runtime:</h5><p>{this.props.movie.runtime}</p>
						<h5 style={{ display: this.props.movie.released ? "block" : "none" }}>Released:</h5><p>{this.props.movie.released}</p>
						<h5 style={{ display: this.props.movie.rating ? "block" : "none" }}>Rating:</h5><p>{this.props.movie.rating}</p>
					</div>
					<div className="col-3">
						<img src={loading} alt={this.props.movie.title} width="250px"></img>
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
	movie: PropTypes.object
};

export default SearchResults;


