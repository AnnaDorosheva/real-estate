"use strict";

export function showErrorMessage(message) {
  const h1 = document.querySelector("h1");
  const img = `<div class="error">
      <p>${message}</p>
      <a href="/index.html">Перейти к списку товаров</a>
      <p></p>
    </div>`;
  h1.insertAdjacentHTML("beforeend", img);
}

export function getBasketLocalStorage() {
  const cardDataJSON = localStorage.getItem("basket");
  return cardDataJSON ? JSON.parse(cardDataJSON) : [];
}

export function setBasketLocalStorage(basket) {
  const basketCount = document.querySelector(".basket__count");
  localStorage.setItem("basket", JSON.stringify(basket));

  basketCount.textContent = basket.length;
}

export function checkigRelevantCardsBusket(cardsData) {
  const basket = getBasketLocalStorage();

  basket.forEach((cardId, index) => {
    const existsInCatalog = cardsData.some(
      (item) => item.id === Number(cardId)
    );
    if (!existsInCatalog) {
      basket.splice(index, 1);
    }
  });
  setBasketLocalStorage(basket);
};


