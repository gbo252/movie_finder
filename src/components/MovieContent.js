import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import "./MovieContent.css";

const decodeHtml = (html) => {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};

class MovieContent extends React.Component {

	state = { imageLoaded: false };

	imageRef = React.createRef();

	componentDidMount() {
		this.imageRef.current.addEventListener("load", () => this.setState({ imageLoaded: true }));
	}

	render() {
		const { title, synopsis, runtime, released, rating, image } = this.props.movie;

		return (
			<div>
				<button
					type="button"
					onClick={this.props.clearCurrentMovie}
					className="btn btn-lg btn-link btn-block text-left px-0 ml-md-n3 back-button netflix-color font-weight-bold">
					BACK
				</button>
				<div className="d-flex justify-content-center px-2">
					<div className="overlay movie-info text-left d-flex flex-column justify-content-around" style={{ maxWidth: "450px" }}>
						<h3 className="text-center">{decodeHtml(title || "")}</h3>
						<div className="row d-flex justify-content-center align-items-center">
							<div className="col d-flex flex-column justify-content-center">
								<h5>Synopsis</h5>
								<p>{decodeHtml(synopsis || "")}</p>
							</div>
							<div className="image-column col-5 d-flex justify-content-center align-items-center mb-2">
								<img
									ref={this.imageRef}
									className="w-100"
									style={this.state.imageLoaded ? { display: "block" } : { display: "none" }}
									src={image}
									alt={title}
								/>
								<div className="position-absolute w-100 d-flex justify-content-center align-items-center netflix-color">
									<Spinner display={!this.state.imageLoaded} />
								</div>
							</div>
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
							<button onClick={this.props.handleSearch} className="btn">
								search {(this.props.searchBy === "genre" ? this.props.genreName : "recently added").toLowerCase()} again
							</button>
						</form>
					</div>
					<div className="image-section d-flex justify-content-center align-items-center pl-4" style={{ minWidth: "250px" }}>
						<img
							ref={this.imageRef}
							className="w-100"
							style={this.state.imageLoaded ? { display: "block" } : { display: "none" }}
							src={image}
							alt={title}
						/>
						<div className="position-absolute w-100 d-flex justify-content-center align-items-center netflix-color">
							<Spinner display={!this.state.imageLoaded} />
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