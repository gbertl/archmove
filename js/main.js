const carousel = ({prevBtn, nextBtn, container, items, interval}) => {
  let size = 0;
  let counter = 0;
  let gap = parseFloat(getComputedStyle(container).gap);

  const apply = () => {
    container.style.transition = "0.4s";
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

document.querySelector(".navbarSearch__btn").addEventListener("click", () => {
  document
    .querySelector(".navbarSearch__inputWrapper")
    .classList.toggle("navbarSearch__inputWrapper--open");
  document.querySelector(".navbarSearch__input").focus();
});

document.body.addEventListener("click", (e) => {
  if (!e.target.closest(".navbarSearch")) {
    document
      .querySelector(".navbarSearch__inputWrapper")
      .classList.remove("navbarSearch__inputWrapper--open");
  }
});

const navtoggler = document.querySelector(".navbar-toggler");
const navbar = document.querySelector(".nav");

navtoggler.addEventListener("click", () => {
  navbar.classList.toggle("nav--open");
});
