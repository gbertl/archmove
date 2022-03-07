const slider = ({
  trackEl,
  containerEl,
  nextBtnEl,
  prevBtnEl,
  slidesEl,
  slidesPerView = false,
}) => {
  const track = document.querySelector(trackEl);
  const container = document.querySelector(containerEl);
  const nextBtn = document.querySelector(nextBtnEl);
  const prevBtn = document.querySelector(prevBtnEl);
  let counter = 0;
  const gap = window.getComputedStyle(track).getPropertyValue('gap');
  const slides = document.querySelectorAll(slidesEl);
  const size = slides[0].offsetWidth + parseInt(gap);
  const edgePos = track.scrollWidth - container.clientWidth;
  const lastCounter = slides.length - 1;

  // gesture states
  let initPos = 0;
  let drag = false;
  let transformed = 0;

  track
    .querySelectorAll('img')
    .forEach((i) => i.addEventListener('dragstart', (e) => e.preventDefault()));

  const calculatePosX = () => size * counter;
  const passEdge = (posX) => Math.abs(posX) > edgePos;

  const apply = () => {
    track.style.transition = '.3s';
    track.style.transform = `translateX(-${
      passEdge(calculatePosX()) ? edgePos : calculatePosX()
    }px)`;
  };

  const increaseCounter = () => {
    if (counter >= lastCounter) {
      counter = 0;
    } else {
      counter += 1;
      if (passEdge(calculatePosX())) {
        counter = lastCounter;
      }
    }
  };

  const decreaseCounter = () => {
    if (counter <= 0) {
      counter = lastCounter;
    } else {
      do {
        counter -= 1;
      } while (passEdge(calculatePosX()));
    }
  };

  const slideNext = () => {
    increaseCounter();
    apply();
  };

  const slidePrev = () => {
    decreaseCounter();
    apply();
  };

  const getTransformed = () => {
    const matrix = window.getComputedStyle(track).getPropertyValue('transform');
    return matrix !== 'none' ? parseInt(matrix.split(',')[4]) : 0;
  };

  const gestureStart = (e) => {
    drag = true;
    initPos = e.pageX;
    transformed = getTransformed();
  };

  const gestureMove = (e) => {
    if (!drag) return;

    let currentPos = transformed + e.pageX - initPos;

    if (currentPos > 0) currentPos = 0;

    if (slidesPerView) {
      if (passEdge(currentPos)) currentPos = -edgePos;
    } else {
      const lastSlidePos = -Math.abs(size * lastCounter);
      if (currentPos < lastSlidePos) currentPos = lastSlidePos;
    }

    track.style.transition = 'none';
    track.style.transform = `translateX(${currentPos}px)`;
  };

  const gestureEnd = () => {
    drag = false;

    const lastTransformed = getTransformed();
    const moved = lastTransformed - transformed;

    if (Math.abs(lastTransformed) === edgePos) {
      counter = lastCounter;
    } else {
      counter = [...slides].findIndex((el, idx) => {
        const nextSlidePos = size * (idx + 1) - 200;
        return Math.abs(lastTransformed) < nextSlidePos;
      });
    }

    apply();
  };

  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);

  track.addEventListener('mousedown', gestureStart);
  track.addEventListener('mousemove', gestureMove);
  track.addEventListener('mouseup', gestureEnd);
};

window.addEventListener('load', () => {
  slider({
    trackEl: '.slider__container',
    containerEl: '.slider',
    nextBtnEl: '.slider__next-btn',
    prevBtnEl: '.slider__prev-btn',
    slidesEl: '.slider__item',
    slidesPerView: true,
  });
  //
  // slider({
  //   trackEl: '.testimonials__carousel-container',
  //   containerEl: '.testimonials__container',
  //   nextBtnEl: '.testimonials__next-btn',
  //   prevBtnEl: '.testimonials__prev-btn',
  //   slidesEl: '.testimonials__text',
  // });
});

document.querySelector('.navbar-search__btn').addEventListener('click', () => {
  document
    .querySelector('.navbar-search__input-wrapper')
    .classList.toggle('navbar-search__input-wrapper--open');
  document.querySelector('.navbar-search__input').focus();
});

document.body.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar-search')) {
    document
      .querySelector('.navbar-search__input-wrapper')
      .classList.remove('navbar-search__input-wrapper--open');
  }
});

const navtoggler = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('.nav');

navtoggler.addEventListener('click', () => {
  navbar.classList.toggle('nav--open');
});
