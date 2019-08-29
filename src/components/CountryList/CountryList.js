import React from 'react';
import Unogs from '../../util/Unogs';

class CountryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            loading: false,
            requestLoading: false
        };
        this.chooseCountry = this.chooseCountry.bind(this);
    }

    componentDidMount() {
        this.setState({ requestLoading: true }, () => {
            Unogs.getData("country").then(response => {
                this.setState({ countries: response, requestLoading: false });
            }).catch(e => console.log(e));
        });
    }

    loadingGenres() {
        return <option value={"loading"} key={"loading"}>Loading...</option>
    }

    renderCountries() {
        if (this.state.countries.length === 0) {
            return [<option value="X" key="X">Choose country...</option>, <option value={"Error"} key={"Error"}>Server Error</option>];
        } else {
            return [<option value="X" key="X">Choose country...</option>].concat(this.state.countries.map(country => {
                return <option value={country[0]} key={country[0]}>
                    {country[2]}
                </option>
            }));
        }
    }

    chooseCountry(event) {
        this.setState({ loading: true }, () => {
            setTimeout(() => {
                this.props.toggleCountryPicked();
            }, 1500);
        });
        event.preventDefault();
    }

    renderButton() {
        let atts = {};
        if (this.props.country === "X") { atts.disabled = true; atts.title = "Select a country" }
        if (this.state.loading) {
            return <button className="btn btn-danger" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        } else {
            return <span {...atts}>
                <button onClick={this.chooseCountry} className="btn btn-danger" {...atts}>Continue</button>
            </span>
        }
    }

    render() {
        return (
            <form className="col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="country-list">Select a Country</label>
                    <select onChange={this.props.onCountry} id="country-list" className="form-control">
                        {this.state.requestLoading ? this.loadingGenres() : this.renderCountries()}
                    </select>
                </div>
                {this.renderButton()}
            </form>
        )
    }
}

export default CountryList;