import { CARD_NOT_FOUND, ERROR_SERVER } from "./constants.js";
import { showErrorMessage, checkigRelevantCardsBusket } from "./utils.js";
import catalog from "./salesobjects.js";

const wrapper = document.querySelector(".js-card-item");

getCard(catalog);

function getCard(arr) {
  if (!arr) {
    showErrorMessage(ERROR_SERVER);
    return;
  };
  loadProductDetails(arr);

}

export function getParamFromURL(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  return urlParams.get(parameter);
}

export function loadProductDetails(data) {
  if (!data || !data.length) {
    showErrorMessage(CARD_NOT_FOUND);
  };

  const cardId = Number(getParamFromURL("id"));

  if (!cardId) {
    showErrorMessage(ERROR_SERVER);
    return;
  }

  checkigRelevantCardsBusket(data);

  const findCard = data.find((item) => cardId === item.id);

  if (!cardId) {
    showErrorMessage(CARD_NOT_FOUND);
    return;
  }

  renderInfoCard(findCard);
}

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
Напишите нам
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


