const prevBtn = document.querySelector(".slider__prev-btn");
const nextBtn = document.querySelector(".slider__next-btn");

const sliderContainer = document.querySelector(".slider__container");
const sliderImages = document.querySelectorAll(".slider__img");

let size = 0;
let counter = 0;
let gap = parseFloat(
  getComputedStyle(document.querySelector(".slider__container")).gap
);

nextBtn.addEventListener("click", () => {
  if (counter + 1 === sliderImages.length) {
    size = 0;
    counter = 0;
  } else {
    size = size + sliderImages[counter].clientWidth + gap;
    counter++;
  }

  sliderContainer.style.transition = "0.4s";
  sliderContainer.style.transform = `translateX(${-size}px)`;
});

prevBtn.addEventListener("click", () => {
  if (counter === 0) {
    size = 0;

    sliderImages.forEach((image) => {
      size = size + image.clientWidth + gap;
    });

    size = size - (sliderImages[sliderImages.length - 1].clientWidth + gap);

    counter = sliderImages.length - 1;
  } else {
    counter--;
    size = size - sliderImages[counter].clientWidth - gap;
  }

  sliderContainer.style.transition = "0.4s";
  sliderContainer.style.transform = `translateX(${-size}px)`;
});
