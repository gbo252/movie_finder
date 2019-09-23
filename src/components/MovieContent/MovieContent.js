import React from "react";
import PropTypes from "prop-types";

const decodeHtml = (html) => {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};

class MovieContent extends React.Component {

	render() {
		const { title, synopsis, runtime, released, rating } = this.props.movie;

		return (
			<div>
				<div className="row">
					<button type="button" onClick={this.props.clearCurrentMovie} className="btn btn-link ml-n3 back-button netflix-color font-weight-bold">BACK</button>
				</div>
				<div className="row justify-content-center">
					<div className="col-7 overlay movie-info text-left d-flex flex-column justify-content-around">
						<h3 className="text-center">{decodeHtml(title || "")}</h3>
						<div>
							<h5>Synopsis</h5>
							<p>{decodeHtml(synopsis || "")}</p>
						</div>
						<div className="row d-flex justify-content-center">
							<div className="col-4" style={{ display: (runtime ? "block" : "none") }}>
								<h5 style={{ display: (runtime ? "block" : "none") }}>Runtime</h5>
								<p>{(runtime || "").replace(/h/, "h ")}</p>
							</div>
							<div className="col-4" style={{ display: (released ? "block" : "none") }}>
								<h5 style={{ display: (released ? "block" : "none") }}>Released</h5>
								<p>{released}</p>
							</div>
							<div className="col-4" style={{ display: (rating ? "block" : "none") }}>
								<h5 style={{ display: (rating ? "block" : "none") }}>Rating</h5>
								<p>{rating}</p>
							</div>
						</div>
						<form className="mx-auto">
							<button onClick={this.props.handleSearch} className="btn search-again">
                                search {(this.props.searchBy === "genre" ? this.props.genreName : "recently added").toLowerCase()} again
							</button>
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
			</div>
		);
	}
}

MovieContent.propTypes = {
	movie: PropTypes.object,
	loadingResults: PropTypes.bool,
	clearCurrentMovie: PropTypes.func,
	handleSearch: PropTypes.func,
	searchBy: PropTypes.string,
	genreName: PropTypes.string
};

export default MovieContent;