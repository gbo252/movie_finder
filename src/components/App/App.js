import React from 'react';
import './App.css';
import GenreList from '../GenreList/GenreList';
import SearchResults from '../SearchResults/SearchResults';
import Unogs from '../../util/Unogs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {},
      movie: ''
    };
    this.search = this.search.bind(this);
    this.randomizeMovie = this.randomizeMovie.bind(this);
  }

  search(genre) {
    if (this.state.searchResults[genre]) {
      console.log(`No search needed for genre: ${genre}`);
      this.setState({ movie: this.randomizeMovie(genre) });
    } else {
      console.log(`Search performed for genre: ${genre}`);
      Unogs.search(genre).then(response => {
        let searchObj = this.state.searchResults;
        searchObj[genre] = response;
        this.setState({ searchResults: searchObj });
      }).then(() => this.setState({ movie: this.randomizeMovie(genre) }));
    }
  }

  randomizeMovie(genre) {
    let moviesArr = this.state.searchResults[genre];
    return moviesArr[Math.floor(Math.random() * moviesArr.length)].title;
  }

  render() {
    return (
      <div className="App">
        <h1>Netflix Random Movie Generator</h1>
        <img src={require('./logo.png')} alt="logo" />
        <GenreList onSearch={this.search} />
        <SearchResults movie={this.state.movie} />
      </div>
    )
  }
}

export default App;