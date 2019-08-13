import React from 'react';

class SearchResults extends React.Component {
    render() {
        return (
            <h3>{this.props.movie.replace(/&#39;/g, "'")}</h3>
        )
    }
}

export default SearchResults;