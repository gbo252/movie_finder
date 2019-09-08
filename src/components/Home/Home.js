import React from "react";
import PropTypes from "prop-types";
import Unogs from "../../util/Unogs";
import "./Home.css";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			loading: false,
			requestLoading: false,
			animate: false
		};
		this.chooseCountry = this.chooseCountry.bind(this);
	}

	componentDidMount() {
		this.setState({ requestLoading: true }, () => {
			Unogs.getData("country").then(response => {
				this.setState({ countries: response.ITEMS, requestLoading: false });
			}).catch(e => console.log(e));
		});
	}

	loadingGenres() {
		return [<option value="loading" key="loading">Loading...</option>, <option value="sizer" key="sizer">Czech eepublica..</option>];
	}

	renderCountries() {
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

	chooseCountry(event) {
		this.setState({ loading: true }, () => {
			setTimeout(() => {
				this.setState({ animate: true });
			}, 1500);
			setTimeout(() => {
				this.props.toggleCountryPicked();
			}, 2500);
		});
		event.preventDefault();
	}

	renderButton() {
		let atts = {};
		if (this.props.country === "X") { atts.disabled = true; atts.title = "Select a country"; }
		if (this.state.loading) {
			return <button className="btn" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Loading...
			</button>;
		} else {
			return <span {...atts}>
				<button onClick={this.chooseCountry} className="btn" {...atts}>Continue</button>
			</span>;
		}
	}

	render() {
		return !this.props.countryPicked && (
			<div className="row App text-white position-absolute text-center d-flex justify-content-center align-items-center">
				<div className={"col-4 d-flex flex-column p-4 justify-content-center align-items-center animate-on-screen" + (this.state.animate ? " animate-off-screen" : "")} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
					<img src={require("../App/netflix_logo.png")} alt="netflix logo" width="175px" />
					<h1 className="pt-1 pb-2">Random Movie Generator</h1>
					<form>
						<div className="form-group pb-2">
							<label htmlFor="country-list">Select a Country</label>
							<select onChange={this.props.onCountry} id="country-list" className="custom-select">
								{this.state.requestLoading ? this.loadingGenres() : this.renderCountries()}
							</select>
						</div>
						{this.renderButton()}
					</form>
				</div>
			</div>
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