let count = 0;

const Unogs = {
    getMovies(recent, genre, gt, country, i) {
        let today = new Date();
        let year = today.getFullYear();
        return fetch(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${recent}-!1900,${year}-!0,5-!0,10-!${genre}-!Movie-!English-!English-!gt${gt}-!&t=ns&cl=${country}&st=adv&ob=Relevance&p=${i}&sa=or`,
            {
                headers: {
                    "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                    "x-rapidapi-key": "6794a4d8e0msh4d6a675aaff7659p1483e4jsn205e93c7f148"
                }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                count++;
                console.log(count);
                if (!jsonResponse.ITEMS) {
                    return [];
                } else {
                    return jsonResponse;
                }
            });
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

    getCountries() {
        return fetch(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=lc&q=available`,
            {
                headers: {
                    "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                    "x-rapidapi-key": "6794a4d8e0msh4d6a675aaff7659p1483e4jsn205e93c7f148"
                }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                count++;
                console.log(count);
                if (!jsonResponse.ITEMS) {
                    return [];
                } else {
                    return jsonResponse.ITEMS;
                }
            });
    }
}

export default Unogs;