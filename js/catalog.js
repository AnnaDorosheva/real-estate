import catalog from "./salesobjects.js";
import makeCardMarckup from "./card-catalog.js";

const COUNT_PAGE_NUMBER = 9;
let countNextPageCards = 1;
let shownCards = COUNT_PAGE_NUMBER;

const wrapperCatalog = document.querySelector(".catalog__wrapper");
const nextPageBtn = document.querySelector(".catalog__btn-next");

getCatalog();

nextPageBtn.addEventListener("click", getNextPage);

// Отрисовка первой страницы каталога / get first page catalog:

function getCatalog() {
  if (catalog.length > COUNT_PAGE_NUMBER) {
    nextPageBtn.disabled = false;
  }

  renderStartPageCatalog(catalog);
}

function renderStartPageCatalog(data) {
  const arrCards = data.slice(0, COUNT_PAGE_NUMBER);

  createCards(arrCards);
}

function createCards(data) {
  data.forEach((card) => {
    const { city, title, price, description, meters, img, id } = card;

    const cardItem = `        <li class="card__item" data-product-id=${id}>
    <h3>${city}</h3>                   </div>
    <div class="card__like">
      <img
        src="./images/love.png"
        alt="like"
        width="34"
      />
    </div>
   <div class="card__imgwraper"><img class="card__img" src="${img}"
   alt="like"
   width="300""/></div><h4 class="popular-slide__title">${title}</h4><div class="popular-slide__head">
   <p class="card__price">${price}$</p>
   <button type="button" class="popular-slide__button" id=${id}>
     <a href="card.html?id=${id}" class="popular-slide__page"
       >Подробнее</a
     >
   </button>
   </div>
   
   <p class="card__description">${description}<span>${meters}м.кв</span></p>
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
     /><span>площадь</span>
   </div>
 </div>
</div>
   </li>`;
    wrapperCatalog.insertAdjacentHTML("beforeend", cardItem);
  });
}

// Загрузка следующей страницы / get next page:
function getNextPage() {
  if (shownCards >= catalog.length) return;

  countNextPageCards += 1;

  const countShowCards = COUNT_PAGE_NUMBER * countNextPageCards;

  const arrCards = catalog.slice(shownCards, countShowCards);

  createCards(arrCards);

  shownCards = wrapperCatalog.children.length;

  if (shownCards >= catalog.length) {
    nextPageBtn.disabled = true;
  }
}
