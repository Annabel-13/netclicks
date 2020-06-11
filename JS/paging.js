/*my paging*/


document.addEventListener("DOMContentLoaded", function() {

    let anonym = function(currentPage){};
    let pageView = new PageView(5);
        pageView.setDelegate(anonym);
});




class PageView {

    totalPages = 3;
    currentPage = 0;
    previousPage = 0;
    children = [];
    delegate = function (currentPage){};
    pages = {};



    constructor(totalPages) {
        this.totalPages = totalPages;
        this.createContainer();
        this.createPages();
        this.drawSelected();
    }

    createContainer() {
        const container = document.createElement('section');
              container.classList.add('paging');

        document.body.appendChild(container);

        const innerContainer = document.createElement('div');
              innerContainer.classList.add('containerPages');
              innerContainer.appendChild(this.createPreviousBtn());
              innerContainer.appendChild( this.createLayoutPage());
              innerContainer.appendChild( this.createNextPage());

        container.appendChild(innerContainer);

    }

    createPages(){

        if (this.totalPages > 0){
            for (let i = 0; i < this.totalPages; i++){
                this.pages.append(this.createChild(i + 1))
            }
        }
    }

    createLayoutPage(){
        const pages = document.createElement('ul');
              pages.classList.add('pages');
              this.pages = pages;
        return pages
    }


    createPreviousBtn(){
        const previous = document.createElement('button');
              previous.classList.add('previous');
              previous.innerHTML = "<i class=\"fas fa-chevron-left\"></i>Previous";
              previous.addEventListener('click', () => {this.movePrevious()});
        return previous
    }

    createNextPage(){
        const next = document.createElement('button');
              next.classList.add('next');
              next.innerHTML = "Next<i class=\"fas fa-chevron-right\"></i>";
              next.addEventListener('click', () => {this.moveNext()});
              return next
    }

    createChild(num){
        const child = document.createElement('li');
              child.classList.add('page');
              child.innerHTML = `${num}`;

              child.addEventListener('click', (event) => {
                  event.preventDefault();
                  const target = event.target;
                  this.previousPage = this.currentPage;
                  this.currentPage = parseInt(target.innerHTML) - 1;
                  this.drawSelected()
              });

        this.children.push(child);
        return child;
    }

    drawSelected(){
        const activeClass = 'active';
        this.children[this.previousPage].classList.remove(activeClass);
        this.children[this.currentPage].classList.add(activeClass);

        if (this.delegate != null){
            this.delegate(this.currentPage + 1);
        }
    }

    setDelegate(delegate){
        this.delegate = delegate;
    }

    moveNext(){
        if (this.currentPage < this.totalPages - 1){
            this.previousPage = this.currentPage;
            this.currentPage += 1;
            this.drawSelected()
        }
    }

    movePrevious(){
        if (this.currentPage > 0){
            this.previousPage = this.currentPage;
            this.currentPage -= 1;
            this.drawSelected()
        }
    }



}



