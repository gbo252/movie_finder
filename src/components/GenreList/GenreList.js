import React from 'react';

class GenreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { genre: "X" };
        this.genres = {
            "Comedy": "1009,10256,10375,105,10778,11559,11755,1208951,1333288,1402,1747,17648,2030,2700,31694,3300,34157,3519,3996,4058,4195,43040,4426,4906,52104,52140,52847,5286,5475,5610,56174,58905,59169,61132,61330,6197,63092,63115,6548,711366,7120,72407,7539,77599,77907,78163,78655,79871,7992,852492,869,89585,9302,9434,9702,9736",
            "Thriller": "10306,10499,10504,10719,11014,11140,1138506,1321,1774,3269,43048,46588,5505,58798,65558,6867,75390,78507,799,852488,8933,89811,9147,972",
            "Horror": "10695,10944,1694,42023,45028,48303,61546,75405,75804,75930,8195,83059,8711,89585",
            "Musicals": "13335,13573,32392,52852,55774,59433,84488,88635",
            "Action": "10673,10702,11804,11828,1192487,1365,1568,2125,2653,43040,43048,4344,46576,75418,76501,77232,788212,801362,852490,899,9584",
            "Romance": "29281,36103,502675",
            "Sci-Fi": "108533,11014,1372,1492,1568,1694,2595,2729,3327,3916,47147,4734,49110,50232,52780,52849,5903,6000,6926,852491",
            "Children": "10056,27480,27950,28034,28083,28233,48586,5455,561,6218,6796,6962,78120,783,89513",
            "Documentaries": "10005,10105,10599,1159,15456,180,2595,26126,2760,28269,3652,3675,4006,4720,48768,49110,49547,50232,5161,5349,55087,56178,58710,60026,6839,7018,72384,77245,852494,90361,9875"
        }
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
        let atts = {};
        if (this.state.genre === "X") { atts.disabled = true; atts.title = "Select a genre" }
        if (this.props.loading) {
            return <button className="btn btn-danger" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        } else {
            return <span {...atts}>
                <button onClick={this.handleSearch} className="btn btn-danger" {...atts}>Find Movie</button>
            </span>
        }
    }

    renderGenres() {
        return Object.keys(this.genres).sort().map(genre => {
            let genreCode = this.genres[genre];
            return <option value={genreCode} key={genreCode}>
                {genre}
            </option>
        });
    }

    render() {
        return (
            <form className="col-3 mx-auto">
                <div className="form-group">
                    <label htmlFor="genre-list">Select a Genre</label>
                    <select onChange={this.handleGenreChange} id="genre-list" className="form-control">
                        <option value="X">Choose genre...</option>
                        {this.renderGenres()}
                    </select>
                </div>
                {this.renderButton()}
            </form>
        )
    }
}

export default GenreList;











