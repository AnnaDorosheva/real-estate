import catalog from "./salesobjects.js";

import {
  showErrorMessage,
  getBasketLocalStorage,
  setBasketLocalStorage,
  checkigRelevantCardsBusket
} from "./utils.js";
import { COUNT_PAGE_NUMBER, NO_HAVE_VARIANTS } from "./constants.js";

let countNextPageCards = 1;
let shownCards = COUNT_PAGE_NUMBER;

const wrapperCatalog = document.querySelector(".catalog__wrapper");
const nextPageBtn = document.querySelector(".catalog__btn-next");

nextPageBtn.addEventListener("click", getNextPage);
wrapperCatalog.addEventListener("click", handleCardClick);

// getCatalog();

// Отрисовка первой страницы каталога / get first page catalog:
function getCatalog() {
  if (catalog.length > COUNT_PAGE_NUMBER) {
    nextPageBtn.disabled = false;
  }

  renderStartPageCatalog(catalog);
}

function renderStartPageCatalog(data) {
  if (!data || !data.length) {
    showErrorMessage(NO_HAVE_VARIANTS);
  }
  const arrCards = data.slice(0, COUNT_PAGE_NUMBER);

  createCards(arrCards);

  checkigRelevantCardsBusket(data);

  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);
};



// Загрузка следующей страницы / get next page:
function getNextPage() {
  if (shownCards >= catalog.length) return;

  countNextPageCards += 1;

  const countShowCards = COUNT_PAGE_NUMBER * countNextPageCards;

  const arrCards = catalog.slice(shownCards, countShowCards);

  createCards(arrCards);

  const basket = getBasketLocalStorage();
  checkingActiveButtons(basket);

  shownCards = wrapperCatalog.children.length;

  if (shownCards >= catalog.length) {
    nextPageBtn.disabled = true;
  };
}

//LocalStorage for Likes
function handleCardClick(event) {
  const targetButton = event.target.closest(".card__add");
  if (!targetButton) return;

  const card = targetButton.closest(".card__item");
  const id = card.dataset.productId;
console.log("KLICK");
  let basket = getBasketLocalStorage();
  if (basket.includes(id)) return;
 
  basket.push(id);
  setBasketLocalStorage(basket);
  checkingActiveButtons(basket);
}

function checkingActiveButtons(basket) {
  const buttons = document.querySelectorAll(".card__add");

  buttons.forEach((btn) => {
    const card = btn.closest(".card__item");
    const id = card.dataset.productId;
    const isInBusket = basket.includes(id);

    btn.disabled = isInBusket;
    btn.classList.toggle("active", isInBusket);
    btn.textContent = isInBusket ? "добвлено" : "добавить";
  });
};


function createCards(data) {
  data.forEach((card) => {
    const { city, title, price, description, meters, img, id } = card;

    const cardItem = `        <li class="card__item" data-product-id="${id}">
    <h3>${city}</h3>                   
    <button class="card__add">

    </button>
   <div class="card__imgwraper"><img class="card__img" src="${img}"
   alt="like"
   width="300"/></div><h4 class="popular-slide__title">${title}</h4><div class="popular-slide__head">
   <p class="card__price">${price}$</p>
   <button type="button" class="popular-slide__button" id="${id}">
     <a href="card.html?id=${id}" class="popular-slide__page"
       >Подробнее</a
     >
   </button>
   </div>
   
   <p class="card__description">${description}</p>
   <span>id: ${id}</span>
   <div class="popular-slide__labels card__labels">
   <div class="popular-slide__label">
     <img
       src="./images/bedroom.png"
       alt="like"
       width="24"
     /><span>Спален</span>
   </div>
   <div class="popular-slide__label">
     <img src="./images/shower.png" alt="like" width="24" /><span
       >санузлов</span
     >
   </div>
   <div class="popular-slide__label">
     <img
     src="./images/measurement.png"
       alt="like"
       width="24"
     /><span>${meters}м.кв</span>
   </div>
 </div>
   </li>`;
   
    wrapperCatalog.insertAdjacentHTML("beforeend", cardItem);
  });
  
};

getCatalog();