
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

const   leftMenu = document.querySelector('.left-menu'),
        burger = document.querySelector('.hamburger'),
        tvShowList = document.querySelector('.tv-shows__list'),
        modal = document.querySelector('.modal'),
        // tvShows = document.querySelector('.tv-shows'),
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
        // tvShowsHead = document.querySelector('.tv-shows__head'),
        posterWrapper = document.querySelector('.poster__wrapper'),
        modalContent = document.querySelector('.modal__content'),
        // pagination = document.querySelector('.pagination'),
        trailerView = document.getElementById('trailer'),
        headTrailer = document.getElementById('headTrailer'),
        loading = document.createElement('div'),
        pageView = {},
        renderCardView = {},
        dbService = {};




// var searchQuery = '';

window.addEventListener('load', (event) => {
    onWindowLoaded(event);
});

function onWindowLoaded() {
    this.dbService =  new DbService();
    this.loadPopularContent();
    this.setupPageView();
    this.setupRenderCard()
}

function loadPopularContent() {

    //preloading for slow internet
    loading.className = 'loading';

    if (document.readyState === 'complete') {
        this.dbService.getPopular(1).then(renderCard)
    }
}

function setupPageView() {
    this.pageView = new PageView();
    this.pageView.setAnotherColor('#800080');
    this.pageView.setDelegate(function (page) {
        loadNextPage(page)
    });
}

function setupRenderCard() {
    this.renderCardView = new RenderCardView();
}


function loadNextPage(page) {
    this.dbService.loadNextPage(this.searchQuery, page).then(renderCard)
}

function reloadPageView(inputTotalPages) {
    let maxCount =  10;
    let totalPages = inputTotalPages > maxCount? maxCount: inputTotalPages;
    this.pageView.setTotalPages(totalPages);
}


const renderCard = (res,target) => {
    tvShowList.textContent = '';


    let loadedContent = res.results;
    console.log(res);

    if(this.dbService.getRequestWasChanged()){
        this.reloadPageView(res.total_pages)
    }

    let cardModels = loadedContent.map(item => prepareCardModel(item));
    this.renderCardView.renderCards(cardModels);

    loading.remove();
};

function prepareCardModel(item){
    const posterIMG =  item.poster_path ? IMG_URL +  item.poster_path : 'img/no-poster.jpg';
    const backdropIMG = item.backdrop_path ? IMG_URL + item.backdrop_path : 'img/no-poster.jpg';
    const voteElem = item.vote_average ? `<span class="tv-card__vote">${item.vote_average}</span>` : '';

    return  new CardModel(item.id, posterIMG,backdropIMG, voteElem, item.name);
}


//starting work with search input
searchForm.addEventListener('submit', event => {
    //stay our position
    event.preventDefault();
    const value = searchFormInput.value.trim(); //saving from blank request
    if (value){
        this.searchQuery = value;
        tvShows.append(loading); //show loader
        this.dbService.getSearchResult(this.searchQuery).then(renderCard);
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
    this.dbService.getTopRated().then((response) => renderCard(response, target))
}
if ( target.closest('#popular')) {
      tvShows.append(loading); //shows loader
    this.dbService.getPopular().then((response) => renderCard(response, target))
}
if (target.closest('#today')) {
      tvShows.append(loading); //shows loader
    this.dbService.getToday().then((response) => renderCard(response, target))
}

if (target.closest('#week')) {
      tvShows.append(loading); //shows loader
    this.dbService.getWeek().then((response) => renderCard(response, target))
}

if (target.closest('#search')) {
   tvShowList.textContent = '';
   tvShowsHead.textContent = '';
}
});

//open modal window
tvShowList.addEventListener('click', event => {
//stay our position
    event.preventDefault();
    //choosing card
    const target = event.target;
    const card = target.closest('.tv-card');

    if (card){

        preloader.style.display = 'block';

            Promise.all([
               this.dbService.getTVShow(card.id),
               this.dbService.getTrailer(card.id)
            ])
            .then(([data, trailerData]) => {

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


                genresList.textContent = '';
                data.genres.forEach(item => {
                    genresList.innerHTML += `<li>${item.name}</li>`;
                });

                //parse trailers request
                if(trailerData.results.length > 0){
                    trailerData.results.forEach(item => {
                        const trailerHtml = document.createElement("li");
                              trailerHtml.innerHTML = getTrailerHtml(item);
                        trailerView.append(trailerHtml);
                    });

                    headTrailer.classList.remove('hide');
                }else{
                    headTrailer.classList.add('hide') ;
                    trailerView.textContent = '';
                }

                rating.textContent = data.vote_average;
                description.textContent = data.overview;
                modalLink.href = data.homepage;
                return data.id
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

function getTrailerHtml(trailerItem){
    return `
                                     <h4>${trailerItem.name}</h4>
                                     <br>
                                    <iframe
                                         width="400"
                                         height="300"
                                         src="https://www.youtube.com/embed/${trailerItem.key}"
                                         frameborder="0"
                                         allowfullscreen>
                                    </iframe>`
}

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








