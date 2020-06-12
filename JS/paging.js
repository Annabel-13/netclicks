/*my paging*/


document.addEventListener("DOMContentLoaded", function() {

    let anonym = function(currentPage){};
    let pageView = new PageView(5,".newPagination");
        pageView.setAnotherColor('#800080');
        pageView.setDelegate(anonym);
});




class PageView {

    totalPages = 3;
    currentPage = 0;
    previousPage = 0;
    children = [];
    delegate = function (currentPage){};
    pages = {};
    container = {};
    color = 'lightseagreen';
    previous = {};
    next = {};



    constructor(totalPages,parentId) {
        this.totalPages = totalPages;
        this.createContainer();
        this.createPages();
        this.drawSelected();
        document.querySelector(parentId).append(this.container);
    }

    createContainer(parentId) {
        const container = document.createElement('section');
              container.classList.add('paging');

        // document.body.appendChild(container);


        const innerContainer = document.createElement('div');
              innerContainer.classList.add('containerPages');
              innerContainer.appendChild(this.createPreviousBtn(this.previous));
              innerContainer.appendChild( this.createLayoutPage());
              innerContainer.appendChild( this.createNextPage(this.next));

        container.appendChild(innerContainer);
        this.container = container;
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
        this.previous = document.createElement('button');
        this.previous.classList.add('previous');
        this.previous.innerHTML = "<i class=\"fas fa-chevron-left\"></i>Previous";
        this.previous.addEventListener('click', () => {this.movePrevious()});

        return this.previous
    }

    createNextPage(){
        this.next = document.createElement('button');
        this.next.classList.add('next');
        this.next.innerHTML = "Next<i class=\"fas fa-chevron-right\"></i>";
        this.next.addEventListener('click', () => {this.moveNext()});

      return this.next
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

        let previousChild = this.children[this.previousPage];
        let currentChild = this.children[this.currentPage];

            previousChild.style.backgroundColor = 'transparent';
            previousChild.style.color = this.color;

            currentChild.style.backgroundColor = this.color;
            currentChild.style.color = 'white';

        if (this.delegate != null){
            this.delegate(this.currentPage + 1);
        }

    }

    setAnotherColor(color){
       this.color = color;
       this.redrawAll();
    }

    redrawAll(){
        this.redrawBtn(this.previous);
        this.redrawBtn(this.next);


        for (let i = 0; i < this.totalPages; i++){
         let child = this.children[i];
            if (i === this.currentPage){
                child.style.backgroundColor = this.color;
                child.style.color = 'white';
            } else {
                child.style.backgroundColor = 'transparent';
                child.style.color = this.color;
            }
        }
    }

    redrawBtn(btn){
        btn.style.borderColor = this.color;
        btn.style.color = this.color;
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



