
class MenuModel{
    label;
    icon;
    categories = [];

    constructor(label,icon,categories){
        this.label = label;
        this.icon = icon;
        this.categories = categories;
    }
}


class createLeftMenu {

    leftMenu = document.querySelector('.left-menu');
    burger = {};


    createBurger() {
        const burger = document.createElement('div');
        burger.classList.add('hamburger', 'active');
        this.leftMenu.appendChild(burger);

        let fragment = document.createDocumentFragment();
        for (let i = 0; i < 3; i += 1) {
            fragment.appendChild(document.createElement("span"));
        }
        burger.appendChild(fragment);

        this.burger = burger
    }


    setup(contentForCells) {
        let container = this.createContainer();
        for (let i = 0; i < contentForCells.length; i++) {
            let model = contentForCells[i];
            let cell = this.createCell(model);
            container.appendChild(cell)
        }

        this.setupEventListener(this.leftMenu, this.burger);
    }

    createCell(contentForCell) {
        const li = document.createElement('li');
              li.innerHTML = this.createLayout(contentForCell.icon, contentForCell.label);

        if (contentForCell.categories.length > 0) {
              li.classList.add('dropdown');

              let container =  this.createCategoryContainer();

              for (let i = 0; i < contentForCell.categories.length; i++){
                   container.innerHTML += this.createCategoryLayout(contentForCell.categories[i]);
              }

              li.appendChild(container)
        }

        return li
    }

    createCategoryContainer(){
        const list = document.createElement('ul');
              list.classList.add('dropdown-list');
        return list
    }

    createContainer() {
        const list = document.createElement('ul');
              list.classList.add('left-menu__list');
        this.leftMenu.appendChild(list);
        return list
    }

    createLayout(icon, label) {
        return `<a href="#" id="${label}">
                <i class="${icon}" aria-hidden="true"></i>
                <span>${label}</span>
            </a>`
    }

    createCategoryLayout(label) {
        return `<li><a href="#" id="${label}">
                        <span>${label}</span>
                    </a></li>`
    }

    setupEventListener(leftMenu, burger) {

        burger.addEventListener('click', () => {
            leftMenu.classList.toggle('openMenu');
            burger.classList.toggle('open');
             closeDropDown()
        });

        leftMenu.addEventListener('click', (event) => {
            //stay our position
            event.preventDefault();
            const target = event.target;
            const dropDown = target.closest('.dropdown');
            if (dropDown) {
                dropDown.classList.toggle('active');
                if(dropDown.classList.contains('active')){
                    leftMenu.classList.add('openMenu');
                    burger.classList.add('open')
                }else{
                    leftMenu.classList.remove('openMenu');
                    burger.classList.remove('open');
                    closeDropDown()
                }
            }

        });

        //action of menu button and open menu
        const closeDropDown = () => {    //close menu after click on body
            dropdown.forEach(item => {
                item.classList.remove('active')
            })
        };
    }
}

