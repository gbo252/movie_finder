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
      movie: {},
      loading: false
    };
    this.search = this.search.bind(this);
    this.randomizeMovie = this.randomizeMovie.bind(this);
  }

  search(genre) {
    if (this.state.searchResults[genre]) {
      this.setState({ movie: {}, loading: true }, () => {
        setTimeout(() => {
          this.setState({ movie: this.randomizeMovie(genre), loading: false });
        }, 1000);
      });
    } else {
      this.setState({ loading: true }, () => {
        Unogs.search(genre).then(response => {
          let searchObj = this.state.searchResults;
          searchObj[genre] = response;
          this.setState({ searchResults: searchObj }, () => {
            this.setState({ movie: this.randomizeMovie(genre), loading: false });
          });
        });
      });
    }
  }

  randomizeMovie(genre) {
    let moviesArr = this.state.searchResults[genre];
    return moviesArr[Math.floor(Math.random() * moviesArr.length)];
  }

  render() {
    return (
      <div className="App">
        <h1>Netflix Random Movie Generator</h1>
        <img src={require('./logo.png')} alt="logo" />
        <GenreList
          onSearch={this.search}
          loading={this.state.loading} />
        <SearchResults movie={this.state.movie} />
      </div>
    )
  }
}

export default App;