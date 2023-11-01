import { CARD_NOT_FOUND, ERROR_SERVER } from "./constants.js";
import {
  showErrorMessage,
  checkigRelevantCardsBusket,
  getBasketLocalStorage,
  setBasketLocalStorage,
} from "./utils.js";
import catalog from "./salesobjects.js";

const TELEGRAM_BOT_TOKEN = "6935673036:AAF8lPHK42jZko7gGrntvhV2fMDa03CLr_o";
const TELEGRAM_CHAT_ID = "@RealEstateOrder1";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const wrapper = document.querySelector(".js-card-item");
const sliderWprapper = document.querySelector(".slider__line");
const dotsWrapper = document.querySelector(".slider__dots");
const smallImages = document.querySelector(".slider__smallsize");

getCard(catalog);

function getCard(arr) {
  if (!arr) {
    showErrorMessage(ERROR_SERVER);
    return;
  }
  const basket = getBasketLocalStorage();
  setBasketLocalStorage(basket);
  loadProductDetails(arr);
}

export function getParamFromURL(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameter);
}

export function loadProductDetails(data) {
  if (!data || !data.length) {
    showErrorMessage(CARD_NOT_FOUND);
  }

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
  const { city, title, price, description, meters, img, imgArr, id } = card;
  getCardImages(imgArr);
  getSmallImages(imgArr);
  const cardItem = `        <li class="card__item" data-product-id="${id}">
    <h3>${city}</h3>                   
    <button class="card__add">
    </button>
 <h4 class="popular-slide__title">${title}</h4><div class="popular-slide__head">
   <p class="card__price">${price}$</p>
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

function getCardImages(images) {
  const imgArr = images
    .map((image) => {
      return `
<img class="slider__img" src=${image} />
`;
    })
    .join(" ");

  const dotsArr = images.map((image) => `<div class="slider__dot"></div>`);
  dotsArr[0] = `<div class="slider__dot active__dot"></div>`;

  const dots = dotsArr.join(" ");
  sliderWprapper.insertAdjacentHTML("afterbegin", imgArr);
  dotsWrapper.insertAdjacentHTML("afterbegin", dots);
}

function getSmallImages(images) {
  const imgArr = images
    .map(
      (img) => `
<img class="slider__smallImg" src=${img} />
`
    )
    .join(" ");
  smallImages.insertAdjacentHTML("afterbegin", imgArr);
}
