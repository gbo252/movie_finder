import React from 'react';
import './GenreList.css';

class GenreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { genre: "" };
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleGenreChange(event) {
        this.setState({ genre: event.target.value });
    }

    handleSearch(event) {
        this.props.onSearch(this.state.genre);
        event.preventDefault();
    }

    render() {
        return (
            <form className="col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select a Genre</label>
                    <select onChange={this.handleGenreChange} className="form-control">
                        <option value="">Choose genre...</option>
                        <option value="6548">Comedy</option>
                        <option value="8933">Thriller</option>
                        <option value="8711">Horror Movies</option>
                    </select>
                </div>
                <button onClick={this.handleSearch} className="btn btn-danger">Find Movie</button>
            </form>
        )
    }
}

export default GenreList;