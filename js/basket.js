import {
  showErrorMessage,
  getBasketLocalStorage,
  setBasketLocalStorage,
  checkigRelevantCardsBusket,
} from "./utils.js";
import catalog from "./salesobjects.js";
import { NO_VARIANS_IN_BASKET, ERROR_SERVER } from "./constants.js";

const basketPage = document.querySelector(".basket__wrapper");

getProducts(catalog);

function getProducts(arr) {
  loadProductBasket(arr);
}

function loadProductBasket(data) {
  basketPage.textContent = "";

  if(data) {checkigRelevantCardsBusket(data);}
  const basket = getBasketLocalStorage();

  if (!basket || !basket.length) {
    showErrorMessage(NO_VARIANS_IN_BASKET);
  };

const findProducts = data.filter(item => basket.includes(item.id));

if(!findProducts) {showErrorMessage(NO_VARIANS_IN_BASKET)};


}
