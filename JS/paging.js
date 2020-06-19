/*my paging*/

class PageView {

    totalPages = 3;
    currentPage = 0;
    previousPage = 0;
    children = [];
    delegate = function (currentPage){};
    layoutWithPages = {};
    container = {};
    color = 'lightseagreen';
    previous = {};
    next = {};



    constructor() {
        this.createContainer();
        this.createPages(this.totalPages);
        this.drawSelected();
        document.querySelector(".newPagination").append(this.container);
    }

    createContainer() {
        const container = document.createElement('section');
              container.classList.add('paging');

        const innerContainer = document.createElement('div');
              innerContainer.classList.add('containerPages');
              innerContainer.appendChild(this.createPreviousBtn(this.previous));
              innerContainer.appendChild( this.createLayoutWithPages());
              innerContainer.appendChild( this.createNextPage(this.next));

        container.appendChild(innerContainer);
        this.container = container;
    }

    setTotalPages(totalPages){
        this.totalPages = totalPages;
        this.removeChildren();
        this.createPages(this.totalPages);
        this.redrawAll(this.totalPages);
    }

    removeChildren(){
        this.layoutWithPages.innerHTML = '';
        this.children = [];
        this.currentPage = 0;
        this.previousPage = 0;
    }

    createPages(totalPages){
        if(totalPages > 0){
            for (let i = 0; i < totalPages; i++){
                this.layoutWithPages.append(
                    this.createChild(i + 1)
                )
            }
        }
    }

    redrawAll(totalPages){
        this.redrawBtn(this.previous);
        this.redrawBtn(this.next);

        for (let i = 0; i < totalPages; i++){
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

    createLayoutWithPages(){
        this.layoutWithPages = document.createElement('ul');
        this.layoutWithPages.classList.add('pages');
        return this.layoutWithPages
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
                  this.drawSelected();
                  this.notifyDelegate();
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
    }

    notifyDelegate(){
        if (this.delegate != null){
            this.delegate(this.currentPage + 1);
        }
    }

    setAnotherColor(color){
       this.color = color;
       this.redrawAll(this.totalPages);
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
            this.drawSelected();
            this.notifyDelegate()
        }
    }

    movePrevious(){
        if (this.currentPage > 0){
            this.previousPage = this.currentPage;
            this.currentPage -= 1;
            this.drawSelected();
            this.notifyDelegate()
        }
    }



}



