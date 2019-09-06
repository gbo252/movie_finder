import React from "react";
import PropTypes from "prop-types";

class RecentSearch extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(event) {
		this.props.onSearch();
		event.preventDefault();
	}

	renderButton() {
		if (this.props.loading) {
			return <button className="btn" type="button" disabled>
				<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Loading...
			</button>;
		} else {
			return <button onClick={this.handleSearch} className="btn">Find Recent Movie</button>;
		}
	}

	render() {
		return (
			<form className="mt-3">
				<p>Click here to search recently added movies ONLY (all genres)</p>
				{this.renderButton()}
			</form>
		);
	}
}

RecentSearch.propTypes = {
	onSearch: PropTypes.func,
	loading: PropTypes.bool
};

export default RecentSearch;