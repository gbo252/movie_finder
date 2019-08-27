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
    this.searchRecent = this.searchRecent.bind(this);
    this.randomizeMovie = this.randomizeMovie.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.toggleCountryPicked = this.toggleCountryPicked.bind(this);
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
        Unogs.search(this.state.country, genre).then(response => {
          let searchObj = this.state.searchResults;
          searchObj[genre] = response;
          this.setState({ searchResults: searchObj }, () => {
            this.setState({ movie: this.randomizeMovie(genre), loading: false });
          });
        });
      });
    }
  }

  searchRecent() {
    if (this.state.searchResults[this.state.countryName]) {
      this.setState({ movie: {}, loading: true }, () => {
        setTimeout(() => {
          this.setState({ movie: this.randomizeMovie(this.state.countryName), loading: false });
        }, 1000);
      });
    } else {
      this.setState({ loading: true }, () => {
        Unogs.search(this.state.country).then(response => {
          let searchObj = this.state.searchResults;
          searchObj[this.state.countryName] = response;
          console.log(response.length);
          this.setState({ searchResults: searchObj }, () => {
            this.setState({ movie: this.randomizeMovie(this.state.countryName), loading: false });
          });
        });
      });
    }
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

  renderPage() {
    if (!this.state.countryPicked) {
      return <CountryList
        country={this.state.country}
        toggleCountryPicked={this.toggleCountryPicked}
        onCountry={this.handleCountryChange} />
    } else {
      return <div>
        <h3>{this.state.countryName}</h3>
        <GenreList
          onSearch={this.search}
          loading={this.state.loading} />
        <RecentSearch
          onSearch={this.searchRecent}
          loading={this.state.loading} />
        <SearchResults movie={this.state.movie} />
      </div>
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Netflix Movie Finder</h1>
        <img src={require('./logo.png')} alt="logo" />
        {this.renderPage()}
      </div>
    )
  }
}

export default App;