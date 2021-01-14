window.addEventListener('load', (event) => {

  let buttonSearch = new NavButton('<i class=" fas fa-search"></i>', 'Search');
      buttonSearch.setDelegateClick(function () {
         console.log("buttonSearch was clicked")
      });
      buttonSearch.setDelegateHover(function (text) {
         console.log("buttonSearch was hovered" + text)
      });

  let buttonTop = new NavButton('<i class="fas fa-trophy"></i>', 'Search');
      buttonTop.setDelegateClick(function () {
        console.log("buttonTop was clicked")
      });
      buttonTop.setDelegateHover(function (text) {
        console.log("buttonTop was hovered" + text)
      });

   // let buttonPopular = new NavButton('<i class=" fas fa-search"></i>', 'Search');

  // let buttonToday = new NavButton('<i class=" fas fa-search"></i>', 'Search');
  // let buttonWeek = new NavButton('<i class=" fas fa-search"></i>', 'Search');




});