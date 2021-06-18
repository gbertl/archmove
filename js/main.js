const carousel = ({prevBtn, nextBtn, container, items}) => {
  let size = 0;
  let counter = 0;
  let gap = parseFloat(getComputedStyle(container).gap);

  nextBtn.addEventListener("click", () => {
    if (counter + 1 === items.length) {
      size = 0;
      counter = 0;
    } else {
      size = size + items[counter].clientWidth + gap;
      counter++;
    }

    container.style.transition = "0.4s";
    container.style.transform = `translateX(${-size}px)`;
  });

  prevBtn.addEventListener("click", () => {
    if (counter === 0) {
      size = 0;

      items.forEach((image) => {
        size = size + image.clientWidth + gap;
      });

      size = size - (items[items.length - 1].clientWidth + gap);

      counter = items.length - 1;
    } else {
      counter--;
      size = size - items[counter].clientWidth - gap;
    }

    container.style.transition = "0.4s";
    container.style.transform = `translateX(${-size}px)`;
  });
};

carousel({
  prevBtn: document.querySelector(".slider__prev-btn"),
  nextBtn: document.querySelector(".slider__next-btn"),
  container: document.querySelector(".slider__container"),
  items: document.querySelectorAll(".slider__item"),
});

carousel({
  prevBtn: document.querySelector(".testimonials__prev-btn"),
  nextBtn: document.querySelector(".testimonials__next-btn"),
  container: document.querySelector(".testimonials__carousel-container"),
  items: document.querySelectorAll(".testimonials__text"),
});
