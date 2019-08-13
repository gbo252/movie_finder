import React from 'react';
import './App.css';
import GenreList from '../GenreList/GenreList';
import SearchResults from '../SearchResults/SearchResults';
import Unogs from '../../util/Unogs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: {} };
    this.search = this.search.bind(this);
  }

  search(genre) {
    Unogs.search(genre).then(response => {
      console.log(genre);
      this.setState({ searchResults: response });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Netflix Random Movie Generator</h1>
        <img src={require('./logo.png')} alt="logo" />
        <GenreList onSearch={this.search} />
        <SearchResults movies={this.state.searchResults} />
      </div>
    )
  }
}

export default App;