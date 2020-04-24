import React from 'react';
import '../css/App.css';
import Search from './Search';
import GenreList from './GenreList';
import Home from './Home';
import CountryLogo from './CountryLogo';
import SearchResults from './SearchResults';
import MovieContent from './MovieContent';
import unogs from '../apis/unogs';
import { Movie, SearchBy, SearchResult, GenreCodes } from '../types';

type State = {
  searchResults: SearchResult;
  movie: Movie;
  loadingResults: boolean;
  searchBy: SearchBy;
  genreName: string;
  genre: string;
  genreResults: GenreCodes[];
  country: string;
  countryName: string;
  countryPicked: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    searchResults: {},
    movie: {},
    loadingResults: false,
    searchBy: SearchBy.genre,
    genreName: '',
    genre: 'X',
    genreResults: [],
    country: 'X',
    countryName: '',
    countryPicked: false
  };

  genresArray: string[] = [
    'All Action',
    'Adventures',
    'All Anime',
    'All Childrens',
    'All Classics',
    'All Comedies',
    'Crime Documentaries',
    'Crime Films',
    'All Cult',
    'All Documentaries',
    'All Dramas',
    'All Faith and Spirituality',
    'Fantasy Movies',
    'All Gay and Lesbian',
    'All Horror',
    'All Independent',
    'All International',
    'All Music',
    'All Musicals',
    'Mysteries',
    'All Romance',
    'All Sci-Fi',
    'All Sports',
    'Stand-up Comedy',
    'All Thrillers'
  ];

  allGenreCodes: number[][] = [];

  async componentDidMount() {
    const response = await unogs.getData<GenreCodes[]>(SearchBy.genre);
    this.setState({ genreResults: response });
  }

  handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { countryName, country, searchBy, genre } = this.state;

    let input: string;
    if (searchBy === SearchBy.genre) {
      input =
        genre === 'random'
          ? this.allGenreCodes[
              Math.floor(Math.random() * this.allGenreCodes.length)
            ].toString()
          : genre;
    } else {
      input = countryName;
    }

    const setMovieState = () => {
      if (
        !(this.state.searchResults)[input] ||
        !(this.state.searchResults)[input].length
      ) {
        this.setState(
          {
            movie: { empty: true, title: ' ' },
            loadingResults: false
          },
          () => {
            setTimeout(() => {
              this.setState({ movie: {} });
            }, 2000);
          }
        );
      } else {
        this.setState(prevState => {
          return {
            movie:
              prevState.searchResults[input][
                Math.floor(
                  Math.random() * prevState.searchResults[input].length
                )
              ],
            loadingResults: false
          };
        });
      }
    };

    this.setState({ movie: { title: ' ' }, loadingResults: true }, async () => {
      if ((this.state.searchResults)[input]) {
        setTimeout(() => setMovieState(), 1500);
      } else {
        const response = await unogs.search(
          country,
          searchBy === SearchBy.genre ? input : null
        );
        this.setState(
          prevState => ({
            searchResults: {
              ...prevState.searchResults,
              [input]: response
            }
          }),
          () => setMovieState()
        );
      }
    });

    event.preventDefault();
  };

  handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      genre: event.target.value,
      genreName: event.target.options[event.target.selectedIndex].text
    });
  };

  handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      country: event.target.value,
      countryName: event.target.options[event.target.selectedIndex].text
    });
  };

  handleSearchByChange = (searchByOption: SearchBy) => {
    this.setState({ searchBy: searchByOption });
  };

  toggleCountryPicked = (countryPicked: boolean): void => {
    if (countryPicked) {
      this.setState({ countryPicked: true });
    } else {
      this.setState({
        countryPicked: false,
        movie: {},
        searchResults: {},
        country: 'X',
        countryName: '',
        genre: 'X',
        genreName: ''
      });
    }
  };

  clearCurrentMovie = () => {
    this.setState({ movie: {}, genre: 'X' });
  };

  render() {
    const {
      country,
      countryName,
      countryPicked,
      movie,
      searchBy,
      genre,
      genreName,
      genreResults,
      loadingResults
    } = this.state;

    return (
      <div className="container">
        <Home
          country={country}
          countryPicked={countryPicked}
          toggleCountryPicked={this.toggleCountryPicked}
          handleCountryChange={this.handleCountryChange}
        />

        <Search
          countryPicked={countryPicked}
          movie={movie}
          changeSearchBy={this.handleSearchByChange}
          searchBy={searchBy}
          genre={genre}
          handleSearch={this.handleSearch}
          toggleCountryPicked={this.toggleCountryPicked}
          countryName={countryName}
        >
          <GenreList
            searchBy={searchBy}
            allGenreCodes={this.allGenreCodes}
            handleGenreChange={this.handleGenreChange}
            genresArray={this.genresArray}
            genreResults={genreResults}
          />
        </Search>

        <SearchResults movie={movie} loadingResults={loadingResults}>
          <MovieContent
            movie={movie}
            clearCurrentMovie={this.clearCurrentMovie}
            handleSearch={this.handleSearch}
            searchBy={searchBy}
            genreName={genreName}
          />
        </SearchResults>

        <CountryLogo
          toggleCountryPicked={this.toggleCountryPicked}
          countryPicked={countryPicked}
          countryName={countryName}
        />
      </div>
    );
  }
}

export default App;
