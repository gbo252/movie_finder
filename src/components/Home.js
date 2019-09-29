import React from "react";
import PropTypes from "prop-types";
import Unogs from "../apis/Unogs";
import netflixLogo from "../images/netflix_logo.png";
import AppRow from "./AppRow";
import "../css/Home.css";

class Home extends React.Component {

	state = {
		countries: [],
		loadingSearchScreen: false,
		loadingCountries: false,
		animate: false
	};


	componentDidMount() {
		this.setState({ loadingCountries: true }, () => {
			Unogs.getData("country").then(response => {
				this.setState({ countries: response.ITEMS, loadingCountries: false });
			});
		});
	}

	renderCountries() {
		if (this.state.loadingCountries) {
			return [<option value="loading" key="loading">Loading...</option>, <option value="sizer" key="sizer">Czech eepublica..</option>];
		} else {
			if (!this.state.countries || !this.state.countries.length) {
				return <option value="Error" key="Error">Server Error</option>;
			} else {
				return [<option value="X" key="X">Choose country...</option>].concat(this.state.countries.map(country => {
					return <option value={country[0]} key={country[0]}>
						{country[2]}
					</option>;
				}));
			}
		}
	}

	chooseCountry = (event) => {
		this.setState({ loadingSearchScreen: true }, () => {
			setTimeout(() => {
				this.setState({ animate: true });
			}, 1500);
			setTimeout(() => {
				this.props.toggleCountryPicked();
				this.setState({ loadingSearchScreen: false });
			}, 2400);
			setTimeout(() => {
				this.setState({ animate: false });
			}, 2500);
		});
		event.preventDefault();
	}

	renderButton() {
		let atts = {};
		if (this.props.country === "X") { atts.disabled = true; atts.title = "Select a country"; }
		if (this.state.loadingSearchScreen) {
			return (
				<button className="btn" type="button" disabled>
					<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Loading...
				</button>
			);
		} else {
			return (
				<span {...atts}>
					<button onClick={this.chooseCountry} className="btn" {...atts}>Continue</button>
				</span>
			);
		}
	}

	render() {
		return !this.props.countryPicked && (
			<AppRow>
				<div className={"col-auto overlay d-flex flex-column p-4 justify-content-center align-items-center animate-on-screen" + (this.state.animate ? " animate-off-screen" : "")}>
					<img src={netflixLogo} alt="netflix logo" width="175px" />
					<h2 className="pt-1 pb-2">Random Movie Generator</h2>
					<form>
						<div className="form-group pb-2">
							<label htmlFor="country-list">Select a Country</label>
							<select onChange={this.props.onCountry} id="country-list" className="custom-select">
								{this.renderCountries()}
							</select>
						</div>
						{this.renderButton()}
					</form>
				</div>
			</AppRow>
		);
	}
}

Home.propTypes = {
	toggleCountryPicked: PropTypes.func,
	country: PropTypes.string,
	onCountry: PropTypes.func,
	countryPicked: PropTypes.bool
};

export default Home;