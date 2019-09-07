import React from "react";
import PropTypes from "prop-types";
import GenreSearch from "../GenreSearch/GenreSearch";
import RecentSearch from "../RecentSearch/RecentSearch";
import SearchResults from "../SearchResults/SearchResults";

class Search extends React.Component {
	render() {
		return this.props.countryPicked && (
			<div className="col-4 d-flex flex-column p-4 justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
				<h3>{this.props.countryName}</h3>
				<h5>Search by:</h5>
				<ul className="nav nav-pills" id="pills-tab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="pills-genre-tab" data-toggle="pill" href="#pills-genre" role="tab" aria-controls="pills-genre" aria-selected="true">Genre</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="pills-recent-tab" data-toggle="pill" href="#pills-recent" role="tab" aria-controls="pills-recent" aria-selected="false">Recently Added</a>
					</li>
				</ul>
				<div className="tab-content" id="pills-tabContent">
					<div className="tab-pane fade show active" id="pills-genre" role="tabpanel" aria-labelledby="pills-genre-tab">
						<GenreSearch
							onSearch={this.props.onSearch}
							loading={this.props.loading} />
						<SearchResults movie={this.props.movie} />
					</div>
					<div className="tab-pane fade" id="pills-recent" role="tabpanel" aria-labelledby="pills-recent-tab">
						<RecentSearch
							onSearch={this.props.onSearch}
							loading={this.props.loading} />
						<SearchResults movie={this.props.movie} />
					</div>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	onSearch: PropTypes.func,
	loading: PropTypes.bool,
	countryName: PropTypes.string,
	movie: PropTypes.object,
	countryPicked: PropTypes.bool
};

export default Search;