import React from 'react';

class SearchResults extends React.Component {
    render() {
        return (
            <div className="row d-flex justify-content-center align-content-center">
                <div className="col-5">
                    <h3>{(this.props.movie.title || '').replace(/&#39;/g, "'")}</h3>
                    <h5>Synopsis:</h5><p>{(this.props.movie.synopsis || '').replace(/&#39;/g, "'").replace(/&rsquo;/g, "’")}</p>
                    <h5>Runtime:</h5><p>{this.props.movie.runtime}</p>
                    <h5>Released:</h5><p>{this.props.movie.released}</p>
                    <h5>Rating:</h5><p>{this.props.movie.rating}</p>
                </div>
                <div className="col-3">
                    <img src={this.props.movie.image} alt={this.props.movie.title}></img>
                </div>
            </div>
        )
    }
}

export default SearchResults;