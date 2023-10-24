import { CARD_NOT_FOUND } from "./constants.js";
import { checkigRelevantCardsBusket } from "./utils.js";
import catalog from "./salesobjects.js";

const wrapper = document.querySelector(".js-card-item");

getCard();
function getCard() {
  loadProductDetails(catalog);
};

export function getParamFromURL(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  return urlParams.get(parameter);
};

export function loadProductDetails(data) {
  if (!data || !data.length) {
    showErrorMessage(CARD_NOT_FOUND);
  };

  const cardId = Number(getParamFromURL("id"));

  if (!cardId) {
    showErrorMessage(ERROR_SERVER);
    return;
  };

  const findCard = data.find((item) => cardId === item.id);

  if (!cardId) {
    showErrorMessage(CARD_NOT_FOUND);
    return;
  };

  renderInfoCard(findCard);
};

function renderInfoCard(card) {
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

  wrapper.insertAdjacentHTML("beforeend", cardItem);
}

function showErrorMessage(message) {
  const h2 = document.querySelector("h2");
  const img = `<div class="error">
        <p>${message}</p>
        <a href="/index.html">Перейти к списку объектов</a>
        <p></p>
      </div>`;
  h2.insertAdjacentHTML("beforeend", img);
}
