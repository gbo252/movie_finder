const Unogs = {
    search(genre, country) {
        function getMovies(genre, country, i) {
            return fetch(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=-!1900,2019-!0,5-!0,10-!${genre}-!Movie-!English-!English-!gt100-!&t=ns&cl=${country}&st=adv&ob=Relevance&p=${i}&sa=and`,
                {
                    headers: {
                        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                        "x-rapidapi-key": "6794a4d8e0msh4d6a675aaff7659p1483e4jsn205e93c7f148"
                    }
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    if (!jsonResponse.ITEMS) {
                        return [];
                    } else {
                        return jsonResponse;
                    }
                });
        }

        return getMovies(genre, country, 1)
            .then(response => {
                let pages = Math.ceil(response.COUNT / 100);
                let promiseArr = [];
                for (let i = 1; i <= pages; i++) {
                    promiseArr.push(getMovies(genre, country, i).then(response => response));
                }
                return Promise.all(promiseArr)
                    .then(promiseArr => promiseArr.map(obj => obj.ITEMS).flat());
            });
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
                    if (!jsonResponse.ITEMS) {
                        return [];
                    } else {
                        return jsonResponse.ITEMS;
                    }
                });
    }
}

export default Unogs;