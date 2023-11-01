"use strict";

const sliderImages = document.querySelectorAll(".slider__img");
const sliderLine = document.querySelector(".slider__line");
const sliderDots = document.querySelectorAll(".slider__dot");
const sliderBtnPrev = document.querySelector(".slider__btn-prev");
const sliderBtnNext = document.querySelector(".slider__btn-next");

sliderBtnNext.addEventListener("click", nextSlide);
sliderBtnPrev.addEventListener("click", prevSlide);

let sliderCount = 0;
let sliderWidth;

window.addEventListener("resize", showSlide);
function showSlide() {
  sliderWidth = document.querySelector(".slider__cards").offsetWidth;
  sliderLine.style.width = sliderWidth * sliderImages.length + "px";

  sliderImages.forEach((item) => (item.style.width = sliderWidth + "px"));
  rollSlider();
}

showSlide();

function nextSlide() {
  sliderCount += 1;
  if (sliderCount >= sliderImages.length) sliderCount = 0;

  rollSlider();
  activSlide(sliderCount);
}

function prevSlide() {
  sliderCount -= 1;
  if (sliderCount < 0) sliderCount = sliderImages.length - 1;

  rollSlider();
  activSlide(sliderCount);
}

function rollSlider() {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function activSlide(index) {
  sliderDots.forEach((dot) => dot.classList.remove("active__dot"));
  sliderDots[index].classList.add("active__dot");
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    sliderCount = index;
    rollSlider();
    activSlide(sliderCount);
  });
});
