import axios from "axios";

const Unogs = {
	fetchData(url) {
		return axios.get(url, {
			headers: {
				"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_UNOGS_API_KEY
			}
		});
	},

	getMovies(recent, genre, gt, country, page) {
		let today = new Date();
		let year = today.getFullYear();
		let url = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${recent}-!1900,${year}-!0,5-!0,10-!${genre}-!Movie-!English-!English-!gt${gt}-!&t=ns&cl=${country}&st=adv&ob=Relevance&p=${page}&sa=or`;
		return this.fetchData(url);
	},

	async search(country, genre) {
		try {
			if (genre) {
				const response = await this.getMovies(
					"",
					genre,
					100,
					country,
					1
				);
				const pages = Math.ceil(response.data.COUNT / 100);
				const promiseArr = [response];
				for (let i = 2; i <= pages; i++) {
					promiseArr.push(this.getMovies("", genre, 100, country, i));
				}
				const genreMovies = await Promise.all(promiseArr);
				return genreMovies.map(res => res.data.ITEMS).flat();
			} else {
				const response = await this.getMovies(
					"get:new30",
					0,
					0,
					country,
					1
				);
				return response.data.ITEMS;
			}
		} catch (error) {
			console.log(error);
		}
	},

	async getData(option) {
		let input =
			option === "genre"
				? "api.cgi?t=genres"
				: "aaapi.cgi?t=lc&q=available";

		let url = `https://unogs-unogs-v1.p.rapidapi.com/${input}`;

		try {
			const response = await this.fetchData(url);
			return response.data.ITEMS;
		} catch (error) {
			console.log(error);
		}
	}
};

export default Unogs;
