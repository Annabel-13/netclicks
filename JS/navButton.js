//a cloud model

class NavButton {



    delegateClick = function (){};
    delegateHover = function (text){};



    constructor(icon, text) {
        this.text = text;
        this.icon = icon;
        this.setup();
    }

    setup() {

        let container = document.querySelector(".nav-container")

        if (container !== null){
            let button = document.createElement("a");
                button.classList.add('nav-link');
                button.innerHTML = this.icon;

                button.addEventListener("click", (event) => {
                  if (this.delegateClick !== null){
                      this.delegateClick();
                  }
                })

                button.addEventListener("mouseover", (event) => {
                  if (this.delegateHover !== null){
                      this.delegateHover(this.text);
                  }
                })


            container.append(button)
        }
    }

    setDelegateClick(delegateClick){
        this.delegateClick = delegateClick;
    }

    setDelegateHover(delegateHover){
        this.delegateHover = delegateHover;
    }



}