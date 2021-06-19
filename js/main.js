const carousel = ({prevBtn, nextBtn, container, items, interval}) => {
  let size = 0;
  let counter = 0;
  let gap = parseFloat(getComputedStyle(container).gap);

  const apply = () => {
    container.style.transition = "1s";
    container.style.transform = `translateX(${-size}px)`;
  };

  const handleNextBtn = () => {
    if (counter + 1 === items.length) {
      size = 0;
      counter = 0;
    } else {
      size = size + items[counter].clientWidth + gap;
      counter++;
    }

    apply();
  };

  const handlePrevBtn = () => {
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

    apply();
  };

  let timer;

  if (interval) timer = setInterval(handleNextBtn, interval);

  const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(handleNextBtn, interval);
  };

  nextBtn.addEventListener("click", () => {
    handleNextBtn();
    if (interval) resetTimer();
  });

  prevBtn.addEventListener("click", () => {
    handlePrevBtn();
    if (interval) resetTimer();
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
  interval: 5000,
});

document.querySelector(".navbar-search__btn").addEventListener("click", () => {
  document
    .querySelector(".navbar-search__input-wrapper")
    .classList.toggle("navbar-search__input-wrapper--open");
  setTimeout(() => {
    document.querySelector(".navbar-search__input").focus();
  }, 400);
});
