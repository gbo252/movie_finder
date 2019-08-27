import React from 'react';

class SearchResults extends React.Component {

    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    render() {
        return (
            <div className="row d-flex justify-content-center align-content-center">
                <div className="col-5">
                    <h3>{this.decodeHtml(this.props.movie.title || '')}</h3>
                    <h5 style={{display: this.props.movie.synopsis ? 'block' : 'none'}}>Synopsis:</h5><p>{this.decodeHtml(this.props.movie.synopsis || '')}</p>
                    <h5 style={{display: this.props.movie.runtime ? 'block' : 'none'}}>Runtime:</h5><p>{this.props.movie.runtime}</p>
                    <h5 style={{display: this.props.movie.released ? 'block' : 'none'}}>Released:</h5><p>{this.props.movie.released}</p>
                    <h5 style={{display: this.props.movie.rating ? 'block' : 'none'}}>Rating:</h5><p>{this.props.movie.rating}</p>
                </div>
                <div className="col-3">
                    <img src={this.props.movie.image} alt={this.props.movie.title}></img>
                </div>
            </div>
        )
    }
}

export default SearchResults;