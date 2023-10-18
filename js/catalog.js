import catalog from "./salesobjects.js";

const wrapperCatalog = document.querySelector(".catalog__wrapper");

const makeAppartmentMarckup = ({
  city,
  title,
  price,
  description,
  meters,
  img,
  id,
}) => {
  return `        <li class="card__item">
 <h3>${city}</h3>
<div class="card__imgwraper"><img class="card__img" src="${img}"
alt="like"
width="300""/></div><h4 class="popular-slide__title">${title}</h4><div class="popular-slide__head">
<p class="card__price">${price}$</p>
<button type="button" class="popular-slide__button">
  <a href="card.html" class="popular-slide__page"
    >Подробнее</a
  >
</button>
</div>

<p class="card__description">${description}<span>${meters}</span></p>
<span>id: ${id}</span>

</li>`;
};

const createCatalog = catalog.map(makeAppartmentMarckup).join("");
wrapperCatalog.insertAdjacentHTML("afterbegin", createCatalog);
