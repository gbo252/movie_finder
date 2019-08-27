import React from 'react';

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
            return <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        } else {
            return <button onClick={this.handleSearch} className="btn btn-primary">Find Recent Movie</button>
        }
    }

    render() {
        return (
            <div className="mt-3">
                <p>Click here to search recently added movies ONLY (all genres)</p>
                {this.renderButton()}
            </div>
        )
    }
}

export default RecentSearch;