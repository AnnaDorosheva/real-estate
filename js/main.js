const menu = document.querySelector(".js-burger");
const header = document.querySelector(".header");


// Бургер-меню, скрываем/открываем:
document.addEventListener("DOMContentLoaded", togleBurgerMenu);

function togleBurgerMenu() {
  menu.addEventListener("click", function () {
    header.classList.toggle("open");
  });
}
