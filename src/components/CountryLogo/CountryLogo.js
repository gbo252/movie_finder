import React from "react";
import PropTypes from "prop-types";
import "./CountryLogo.css";
import netflixLogo from "../App/netflix_logo.png";

class CountryLogo extends React.Component {
	render() {
		return this.props.countryPicked && (
			<div className="row text-white ml-1 mt-3">
				<div className="col-2 text-center py-3 animate-fade-in" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
					<img src={netflixLogo} alt="netflix logo" width="175px" />
					<h5 id="country-name" className="mt-1 mb-0" onClick={this.props.toggleCountryPicked} title="Click to change Country">{this.props.countryName}</h5>
				</div>
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