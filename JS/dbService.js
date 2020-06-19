
//work with server
class DbService {

    requestWasChanged = false;
    baseUrl = 'https://api.themoviedb.org/3';
    apiKey = '061ad6a96dfe09fe288c84d0409b6df7';
    requestCode = 0;




    setRequestCode(code){
        this.requestWasChanged = this.requestCode !== code;

        if(this.requestCode !== code){
            this.requestCode = code;
        }
    }

    getRequestWasChanged(){
        return this.requestWasChanged
    }

    loadNextPage(searchQuery, page){
        switch (this.requestCode) {
            case 1: return this.getSearchResult(searchQuery, page);
            case 2: return this.getPopular(page);
            case 3: return this.getTopRated(page);
            case 4: return this.getWeek(page);
            case 5: return this.getToday(page);
        }
    }

    getSearchResult = (query, page) =>
        this.getData(`${this.baseUrl}/search/tv?api_key=${this.apiKey}&language=ru-RU&page=${page}&query=${query}&include_adult=false`, 1);

    getPopular = (page) => this.getData(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=ru-RU&page=${page}`, 2);
    getTopRated = (page) => this.getData(`${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&language=ru-RU&page=${page}`, 3);
    getWeek = (page) => this.getData(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}&language=ru-RU&page=${page}`, 4);
    getToday = (page) => this.getData(`${this.baseUrl}/tv/airing_today?api_key=${this.apiKey}&language=ru-RU&page=${page}`, 5);
    getTrailer = (id) => this.getData(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}&language=ru-RU`, this.requestCode);
    getTVShow = (id) => this.getData(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}&language=ru-RU`, this.requestCode);

    //connection with server
    getData = async (url, requestCode) => { //create request

        this.setRequestCode(requestCode);

        const res = await fetch(url);
        //status of response
        if (res.ok) {
            return res.json()

        }else {
            throw new Error(`Не удалось найти данные по адресу ${url}!`)
        }
    };
}
