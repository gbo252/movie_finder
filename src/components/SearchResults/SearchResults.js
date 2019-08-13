import React from 'react';

class SearchResults extends React.Component {
    render() {
        return (
            <ul>
                {this.props.movies.map(movie => {
                    return <li>{movie.title}</li>
                    })}
            </ul>
        )
    }
}

export default SearchResults;

//this.props.movies[Math.floor(Math.random() * this.props.movies.length)]