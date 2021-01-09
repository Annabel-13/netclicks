let content = document.getElementById('mainMenu');
let show = document.querySelector('.angle');


show.addEventListener("click", () => {

    content.classList.add('active');
    show.classList.add('close')
});

document.addEventListener('click', (event) => {

    const target = event.target;
    if (!target.closest('.topPart')) {
        content.classList.remove('active');
        show.classList.remove('close')
    }
});



