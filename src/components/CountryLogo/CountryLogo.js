import React from "react";
import PropTypes from "prop-types";
import "./CountryLogo.css";
import netflixLogo from "../App/netflix_logo.png";

class CountryLogo extends React.Component {
	render() {
		return (
			<div className="row text-white ml-1 mt-3">
				<div className="col-2 text-center pt-3 pb-2 animate-fade-in" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
					<img src={netflixLogo} alt="netflix logo" width="175px" />
					<h5 className="mt-1 mb-0">{this.props.countryName}</h5>
					<button type="button" onClick={this.props.toggleCountryPicked} className="change btn btn-link btn-sm">change</button>
				</div>
			</div>
		);
	}
}

CountryLogo.propTypes = {
	countryName: PropTypes.string,
	toggleCountryPicked: PropTypes.func
};

export default CountryLogo;