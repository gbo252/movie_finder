import axios from 'axios';
import { Movie, SearchBy } from '../types';

interface MovieData {
  data: {
    COUNT: number,
    ITEMS: Movie[]
  }
}

const unogs = {
  fetchData<T, R>(url: string): Promise<R> {
    return axios.get<T, R>(url, {
      headers: {
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_UNOGS_API_KEY
      }
    });
  },

  getMovies(
    recent: string,
    genre: string | 0,
    gt: number,
    country: string,
    page: number
  ): Promise<MovieData> {
    let today = new Date();
    let year = today.getFullYear();
    let url = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${recent}-!1900,${year}-!0,5-!0,10-!${genre}-!Movie-!English-!English-!gt${gt}-!&t=ns&cl=${country}&st=adv&ob=Relevance&p=${page}&sa=or`;
    return this.fetchData<Movie[], MovieData>(url);
  },

  async search(country: string, genre: string | null): Promise<Movie[]> {
    try {
      if (genre) {
        const response = await this.getMovies('', genre, 100, country, 1);
        const pages = Math.ceil(response.data.COUNT / 100);
        const promiseArr: (MovieData | Promise<MovieData>)[] = [response];
        for (let i = 2; i <= pages; i++) {
          promiseArr.push(this.getMovies('', genre, 100, country, i));
        }
        const genreMovies = await Promise.all(promiseArr);
        return genreMovies
          .map(res => res.data.ITEMS)
          .reduce((acc, curr) => {
            return acc.concat(curr);
          }, []);
      } else {
        const response = await this.getMovies('get:new30', 0, 0, country, 1);
        return response.data.ITEMS;
      }
    } catch (err) {
      return [];
    }
  },

  async getData<T>(option: string) {
    let input =
      option === SearchBy.genre ? 'api.cgi?t=genres' : 'aaapi.cgi?t=lc&q=available';

    let url = `https://unogs-unogs-v1.p.rapidapi.com/${input}`;

    try {
      const response = await this.fetchData<T, { data: { ITEMS: T } }>(url);
      return response.data.ITEMS;
    } catch (err) {
      return [];
    }
  }
};

export default unogs;
