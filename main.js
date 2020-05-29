
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = '061ad6a96dfe09fe288c84d0409b6df7';
const SERVER = 'https://api.themoviedb.org/3';

const   leftMenu = document.querySelector('.left-menu'),
        burger = document.querySelector('.hamburger'),
        tvShowList = document.querySelector('.tv-shows__list'),
        modal = document.querySelector('.modal'),
        tvShows = document.querySelector('.tv-shows'),
        tvCardImg = document.querySelector('.tv-card__img'),
        modalTitle = document.querySelector('.modal__title'),
        genresList = document.querySelector('.genres-list'),
        rating = document.querySelector('.rating'),
        description = document.querySelector('.description'),
        modalLink = document.querySelector('.modal__link'),
        searchForm = document.querySelector('.search__form'),
        searchFormInput = document.querySelector('.search__form-input'),
        preloader = document.querySelector('.preloader'),
        dropdown = document.querySelectorAll('.dropdown'),
        tvShowsHead = document.querySelector('.tv-shows__head'),
        posterWrapper = document.querySelector('.poster__wrapper'),
        modalContent = document.querySelector('.modal__content'),
        pagination = document.querySelector('.pagination');




//preloading for slow internet
const loading = document.createElement('div');
      loading.className = 'loading';


//work with server
class DBservice {

    //connection with server
    getData = async (url) => { //create request

        const res = await fetch(url);
        //status of response
        if (res.ok) {
            return res.json()

        }else {
            throw new Error(`Не удалось найти данные по адресу ${url}!`)
        }
    };
    // getTestData = () => {
    //     return this.getData('test.json')
    // };
    //
    // getTestCard = () => {
    //     return this.getData('card.json')
    // };


    //all searching results
    getSearchResult = query => {
        this.temp = `${SERVER}/search/tv?api_key=${API_KEY}&language=ru-RU&page=1&query=${query}&include_adult=false`;
        return this.getData( this.temp)};
    //add page number

    getNextPage = page => {return this.getData( this.temp + page)};


    //info about show
    getTVShow = (id) => this.getData(`${SERVER}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
    getTopRated = () => this.getData(`${SERVER}/tv/top_rated?api_key=${API_KEY}&language=ru-RU&page=1`);
    getPopular = () => this.getData(`${SERVER}/tv/popular?api_key=${API_KEY}&language=ru-RU&page=1`);
    getWeek = () => this.getData(`${SERVER}/tv/on_the_air?api_key=${API_KEY}&language=ru-RU&page=1`);
    getToday = () => this.getData(`${SERVER}/tv/airing_today?api_key=${API_KEY}&language=ru-RU&page=1`);


}

const dBservice = new DBservice();

//create card in the list (outside)
const renderCard = (response,target) => {
    console.log(response);
    tvShowList.textContent = '';

    //text for searching results
    if (!response.total_results) {
        loading.remove();
        tvShowsHead.textContent = 'По вашему запросу ничего не найдено!';
        tvShowsHead.style.color = 'red';
        return;
    }

    tvShowsHead.textContent = target ? target.textContent : 'Результат поиска:';
    tvShowsHead.style.color = 'green';

    response.results.forEach( item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
            } = item;

        console.log(vote);

        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = backdrop ? IMG_URL + backdrop : 'img/no-poster.jpg';
        const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

        //create card
        const card = document.createElement('li');
            card.idTVShows = id;
            card.classList.add('tv-shows__item');
            card.innerHTML = `
            <a href="#" id='${id}' class="tv-card">
                        ${voteElem}
                        <img class="tv-card__img"
                             src="${posterIMG}"
                             data-backdrop="${backdropIMG}"
                             alt=${title}>
                        <h4 class="tv-card__head">${title}</h4>
                    </a>
            `;
            loading.remove();
            tvShowList.append(card)

    });


    //few pages with results
    pagination.textContent = '';

    // if (response.total_pages > 1){
    //     for (let i = 1; i <= response.total_pages; i++){
    //         pagination.innerHTML += `<li><a href="#" class="pages">${i}</a></li>`
    //     }
    // }
};
//starting work with search input
searchForm.addEventListener('submit', event => {
    //stay our position
    event.preventDefault();
    const value = searchFormInput.value.trim(); //saving from blank request
    if (value){
        tvShows.append(loading); //show loader
        dBservice.getSearchResult(value).then(renderCard);
    }
    searchFormInput.value = '';


});




//action of menu button and open menu
const closeDropDown = () => {    //close menu after click on body
    dropdown.forEach(item => {
        item.classList.remove('active')
    })
};

burger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    burger.classList.toggle('open');
    closeDropDown()
});

//what card did we click
document.addEventListener('click', (event) => {

    const target = event.target;
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        burger.classList.remove('open');
        closeDropDown()
    }
});

//open left menu
leftMenu.addEventListener('click', (event) => {
    //stay our position
    event.preventDefault();
    const target = event.target;
    const dropDown = target.closest('.dropdown');
    if (dropDown) {
        dropDown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        burger.classList.add('open')
    }

if (target.closest('#top-rated')) {
      tvShows.append(loading); //shows loader
       dBservice.getTopRated().then((response) => renderCard(response, target))
}
if (target.closest('#popular')) {
      tvShows.append(loading); //shows loader
       dBservice.getPopular().then((response) => renderCard(response, target))
}
if (target.closest('#today')) {
      tvShows.append(loading); //shows loader
       dBservice.getToday().then((response) => renderCard(response, target))
}

if (target.closest('#week')) {
      tvShows.append(loading); //shows loader
      dBservice.getWeek().then((response) => renderCard(response, target))
}

if (target.closest('#search')) {
   tvShowList.textContent = '';
   tvShowsHead.textContent = '';
}





});


//changing posters with moving of mouse
const changeImg = event  => {
    // const card = event.target.matches('tv-card__img');
    const card = event.target.closest('.tv-shows__item');

    if (card) {
        const img = card.querySelector('.tv-card__img');
        if (img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
        }
    }


    // if (card) {
    //     const changeImg = card.dataset.back
    //     // }
};

tvShowList.addEventListener('mouseover', changeImg);
tvShowList.addEventListener('mouseout', changeImg);


//open modal window
tvShowList.addEventListener('click', event => {
//stay our position
    event.preventDefault();
    //choosing card
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card){

        preloader.style.display = 'block';
        // get info about serial with id
        dBservice.getTVShow(card.id)
                   .then(data => {

                       if ( data.poster_path){
                           tvCardImg.src = IMG_URL + data.poster_path;
                           tvCardImg.alt =  data.name;
                           posterWrapper.style.display = '';
                           modalContent.style.padding = ''
                       } else {
                           posterWrapper.style.display = 'none';
                           modalContent.style.padding = '25px'
                       }


                       modalTitle.textContent = data.name;
                       // genresList.innerHTML = data.genres.reduce((acc, item) => `${acc} <li>${item.name}</li>`, '');
                       genresList.textContent = '';
                       // for (const item of data.genres) {
                       //     genresList.innerHTML += `<li>${item.name}</li>`;
                       // }

                       data.genres.forEach(item => {
                           genresList.innerHTML += `<li>${item.name}</li>`;
                       });
                       rating.textContent = data.vote_average;
                       description.textContent = data.overview;
                       modalLink.href = data.homepage

                   })
                    .then(() => {
            document.body.style.overflow = 'hidden';
            modal.classList.remove('hide')
        })
                    .finally (() => {
                        preloader.style.display = '';
        })


    }
});


//closing

modal.addEventListener('click', event => {
    const target = event.target;
    const cross = target.closest('.cross');
    const back = target.classList.contains('modal');

    if (cross || back){
        document.body.style.overflow = '';
        modal.classList.add('hide')
    }
});

// pagination.addEventListener('click', (event) => {
//     event.preventDefault();
//     const target = event.target;
//     //check that we choose page
//     if (target.classList.contains('pages')) {
//         tvShows.append(loading); //shows loader
//         dBservice.getNextPage(target.textContent).then(renderCard)
//     }
// });
