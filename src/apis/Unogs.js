let count = 0;

const Unogs = {
	handleErrors(response) {
		if (!response.ok) {
			console.log(`Bad Request: ${response.statusText}`);
		}
		return response;
	},

	fetch(url) {
		return fetch(url,
			{
				headers: {
					"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
					"x-rapidapi-key": process.env.REACT_APP_UNOGS_API_KEY
				}
			})
			.then(Unogs.handleErrors)
			.then(response => response.json())
			.then(jsonResponse => {
				count++;
				console.log(count);
				if (!jsonResponse.ITEMS) {
					return [];
				} else {
					return jsonResponse;
				}
			}).catch(e => console.log(e));
	},

	getMovies(recent, genre, gt, country, i) {
		let today = new Date();
		let year = today.getFullYear();
		let url = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${recent}-!1900,${year}-!0,5-!0,10-!${genre}-!Movie-!English-!English-!gt${gt}-!&t=ns&cl=${country}&st=adv&ob=Relevance&p=${i}&sa=or`;
		return Unogs.fetch(url);
	},

	search(country, genre) {
		if (genre) {
			return Unogs.getMovies("", genre, 100, country, 1)
				.then(response => {
					let pages = Math.ceil(response.COUNT / 100);
					let promiseArr = [];
					for (let i = 1; i <= pages; i++) {
						promiseArr.push(Unogs.getMovies("", genre, 100, country, i).then(response => response));
					}
					return Promise.all(promiseArr)
						.then(promiseArr => promiseArr.map(obj => obj.ITEMS).flat());
				});
		} else {
			return Unogs.getMovies("get:new30", 0, 0, country, 1)
				.then(response => response.ITEMS);
		}
	},

	getData(option) {
		let input;
		if (option === "genre") {
			input = "api.cgi?t=genres";
		} else if (option === "country") {
			input = "aaapi.cgi?t=lc&q=available";
		} else {
			console.log("No data request specified in getData function");
		}
		let url = `https://unogs-unogs-v1.p.rapidapi.com/${input}`;
		return Unogs.fetch(url);
	}
};

export default Unogs;