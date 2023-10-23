"use strict";

export function showErrorMessage(message) {
  const h1 = document.querySelector(".catalog h2");
  const img = (
    `<div class="error">
      <p>${message}</p>
      <a href="/index.html">Перейти к списку товаров</a>
      <p></p>
    </div>`
  );
  h1.insertAdjacentHTML("beforeend", img);
};

export function getBasketLocalStorage() {
  const cardDataJSON = localStorage.getItem("basket");
  console.log(cardDataJSON);
  return cardDataJSON ? JSON.parse(cardDataJSON) : [];
}

export function setBasketLocalStorage(basket) {
  const basketCount = document.querySelector(".basket__count");
  localStorage.setItem("basket", JSON.stringify(basket));
  basketCount.textContent = basket.length;
  console.log(basket)
}
