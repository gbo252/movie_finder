import React from "react";
import PropTypes from "prop-types";
import "./CountryLogo.css";
import netflixLogo from "../App/netflix_logo.png";

class CountryLogo extends React.Component {
	render() {
		return this.props.countryPicked && (
			<div className="text-white text-center ml-1 mt-3 py-3 animate-fade-in" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", width: "250px" }}>
				<img src={netflixLogo} alt="netflix logo" width="175px" />
				<h5 id="country-name" className="mt-1 mb-0" onClick={this.props.toggleCountryPicked} title="click to change Country">{this.props.countryName}</h5>
			</div>
		);
	}
}

CountryLogo.propTypes = {
	countryName: PropTypes.string,
	toggleCountryPicked: PropTypes.func,
	countryPicked: PropTypes.bool
};

export default CountryLogo;