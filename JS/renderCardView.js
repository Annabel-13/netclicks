

class RenderCardView {


    tvShowList = document.querySelector('.tv-shows__list');
    tvShowsHead = document.querySelector('.tv-shows__head');




    constructor(){
        this.tvShowList.addEventListener('mouseover', this.changeImg);
        this.tvShowList.addEventListener('mouseout', this.changeImg);
    }


    renderCards(cardModels,target){

        if(cardModels.length > 1){
            this.showResultTitle(target);
            this.tvShowList.textContent = '';

            cardModels.forEach( item => {
                this.tvShowList.append(
                    this.createCard(item)
                );
            })
        }else {
            this.showNoResultTitle();
        }
    }


     showNoResultTitle() {
         this.tvShowsHead.textContent = 'По вашему запросу ничего не найдено!';
         this.tvShowsHead.style.color = 'red';
    }

     showResultTitle(target) {
         this.tvShowsHead.textContent = target ? target.textContent : 'Результат поиска:';
         this.tvShowsHead.style.color = 'green';
    }

     createCard(cardModel) {
        const card = document.createElement('li');
              card.idTVShows = cardModel.id;
              card.classList.add('tv-shows__item');
              card.innerHTML = this.getCard(cardModel);
        return card
    }

     getCard(model){
        return `
            <a href="#" id='${model.id}' class="tv-card">
                        ${model.voteElem}
                        <img class="tv-card__img"
                             src="${model.posterIMG}"
                             data-backdrop="${model.backdropIMG}"
                             alt=${model.title}>
                        <h4 class="tv-card__head">${model.title}</h4>
                    </a>
            `;
    }

    //changing posters with moving of mouse
    changeImg = event  => {
        // const card = event.target.matches('tv-card__img');
        const card = event.target.closest('.tv-shows__item');

        if (card) {
            const img = card.querySelector('.tv-card__img');
            if (img.dataset.backdrop) {
                [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
            }
        }
    };

}


function CardModel (id, posterIMG, backdropIMG, voteElem, title){
    this.id = id;
    this.posterIMG = posterIMG;
    this.backdropIMG = backdropIMG;
    this.voteElem = voteElem;
    this.title = title;
}






