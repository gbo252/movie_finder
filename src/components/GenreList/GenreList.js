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

    renderButton() {
        if (this.props.loading) {
            return <button className="btn btn-danger" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        } else {
            return <button onClick={this.handleSearch} className="btn btn-danger">Find Movie</button>
        }
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
                        <option value="8711">Horror</option>
                        <option value="13335">Musicals</option>
                    </select>
                </div>
                {this.renderButton()}
            </form>
        )
    }
}

export default GenreList;