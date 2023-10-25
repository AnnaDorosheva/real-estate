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

basketPage.addEventListener("click", deleteCardBasket);

function getProducts(arr) {
  loadProductBasket(arr);
}

function loadProductBasket(data) {
  basketPage.textContent = "";

  if (data) {
    checkigRelevantCardsBusket(data);
  }
  const basket = getBasketLocalStorage();

  if (!basket || !basket.length) {
    showErrorMessage(NO_VARIANS_IN_BASKET);
  }

  const findProducts = data.filter((item) => basket.includes(String(item.id)));
  console.log();
  if (!findProducts) {
    showErrorMessage(NO_VARIANS_IN_BASKET);
    return;
  }

  renderProductsBasket(findProducts);
}

export function deleteCardBasket(event) {
    const targetBtn = event.target.closest(".delete__card");
    if(!targetBtn) return;
  
    const card = event.target.closest(".card__item");
    const id = card.dataset.productId;
  
    const basket = getBasketLocalStorage();
  
    const newBasket = basket.filter(item => item !== id);
    console.log(newBasket)
    setBasketLocalStorage(newBasket);
    getProducts(catalog);
  }

function renderProductsBasket(card) {
  card.forEach((card) => {
    const { city, title, price, meters, img, id } = card;

    const cardItem = `        <li class="card__item" data-product-id="${id}">
        <h3>${city}</h3>                   
        <button class="card__add">
    
        </button>
       <div class="card__imgwraper"><a href="card.html?id=${id}" class="popular-slide__page"
       ><img class="card__img" src="${img}"
       alt="like"
       width="300"/></a></div><h4 class="popular-slide__title">${title}</h4><div class="popular-slide__head">
       <p class="card__price">${price}$</p>
       <button type="button" class="popular-slide__button" id="${id}">
         <a href="card.html?id=${id}" class="popular-slide__page"
           >Подробнее</a
         >
       </button>
       </div>

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
     <button class="delete__card">Удалить</button>
       </li>`;

    basketPage.insertAdjacentHTML("beforeend", cardItem);
  });
}


