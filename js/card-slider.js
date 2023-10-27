"use strict";

import catalog from "./salesobjects.js";

const images = [
  "villa1.jpg",
  "villa2.jpg",
  "villa3.jpg",
  "villa4.jpg",
  "villa5.jpg",
  "villa41.jpg",
];

const sliderPlase = document.querySelector(".slider__line");

let activeImg = 0;
let flag = true;

const inSlider = () => {
  const img = document.createElement("img");
  sliderPlase.style.width = 3 * sliderPlase.offsetWidth + "px";
  sliderPlase.style.heigth = sliderPlase.offsetHeigth + "px";
  sliderPlase.left = "-" + sliderPlase.offsetWidth + "px";
  img.alt = "";
  img.src = "../images/objects-imajes/img1/" + images[activeImg];
  sliderPlase.append(img);

  nextImgGenerate();
  prevImgGenerate();
};

const nextImgGenerate = () => {
  let nexImg = activeImg + 1;
  if (nexImg >= images.length) nexImg = 0;
  const img = document.createElement("img");
  img.alt = "";
  img.src = "../images/objects-imajes/img1/" + images[nexImg];
  sliderPlase.append(img);
};

const prevImgGenerate = () => {
  let prevImg = activeImg - 1;
  if (prevImg < 0) prevImg === images.length - 1;

  const img = document.createElement("img");
  img.alt = "";
  img.src = "../images/objects-imajes/img1/" + images[prevImg];
  sliderPlase.prepend(img);
};

function nextSlide() {
  activeImg += 1;
  if(activeImg > images.length) activeImg = 0;
  document.querySelector(".slider__line img").remove()
  nextImgGenerate();
}

function prevSlide() {
  activeImg -= 1;
  if(activeImg < 0) activeImg = images.length - 1;
  prevImgGenerate();
  document.querySelector(".slider__line img:last-child").remove()
}
inSlider();

document.querySelector(".next__btn").addEventListener("click", nextSlide);
document.querySelector(".prev__btn").addEventListener("click", prevSlide);