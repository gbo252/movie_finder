import React from 'react';
import './App.css';
import GenreList from '../GenreList/GenreList';
import RecentSearch from '../RecentSearch/RecentSearch';
import CountryList from '../CountryList/CountryList';
import SearchResults from '../SearchResults/SearchResults';
import Unogs from '../../util/Unogs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: {},
      movie: {},
      country: "X",
      countryName: "",
      loading: false,
      countryPicked: false
    };
    this.search = this.search.bind(this);
    this.randomizeMovie = this.randomizeMovie.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.toggleCountryPicked = this.toggleCountryPicked.bind(this);
  }

  search(genre) {
    let input = genre ? genre : this.state.countryName;

    const setMovieState = () => {
      if (this.state.searchResults[input].length === 0) {
        this.setState({ movie: { empty: true }, loading: false });
      } else {
        this.setState({ movie: this.randomizeMovie(input), loading: false });
      }
    }

    this.setState({ movie: {}, loading: true }, () => {
      if (this.state.searchResults[input]) {
        setTimeout(() => {
          setMovieState();
        }, 1000);
      } else {
        Unogs.search(this.state.country, genre ? genre : null).then(response => {
          let searchObj = this.state.searchResults;
          searchObj[input] = response;
          console.log(`Found: ${response.length} ${genre ? "" : "recent"} movies ${genre ? "for this genre" : ""}`);
          this.setState({ searchResults: searchObj }, () => {
            setMovieState();
          });
        });
      }
    });
  }

  randomizeMovie(input) {
    let moviesArr = this.state.searchResults[input];
    return moviesArr[Math.floor(Math.random() * moviesArr.length)];
  }

  handleCountryChange(event) {
    this.setState({ country: event.target.value, countryName: event.target.options[event.target.selectedIndex].text });
  }

  toggleCountryPicked() {
    this.setState({ countryPicked: true });
  }

  render() {
    let page;

    if (!this.state.countryPicked) {
      page = (
        <CountryList
          country={this.state.country}
          toggleCountryPicked={this.toggleCountryPicked}
          onCountry={this.handleCountryChange} />
      )
    } else {
      page = (
        <div>
          <h3>{this.state.countryName}</h3>
          <GenreList
            onSearch={this.search}
            loading={this.state.loading} />
          <RecentSearch
            onSearch={this.search}
            loading={this.state.loading} />
          <SearchResults movie={this.state.movie} />
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Netflix Movie Finder</h1>
        <img src={require('./logo.png')} alt="logo" />
        {page}
      </div>
    )
  }
}

export default App;