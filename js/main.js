const slider = ({ trackEl, containerEl, nextBtnEl, prevBtnEl, slidesEl }) => {
  const track = document.querySelector(trackEl);
  const container = document.querySelector(containerEl);
  const nextBtn = document.querySelector(nextBtnEl);
  const prevBtn = document.querySelector(prevBtnEl);
  let counter = 0;
  const gap = window.getComputedStyle(track).getPropertyValue('gap');
  const slides = document.querySelectorAll(slidesEl);
  const size = slides[0].offsetWidth + parseInt(gap);

  // gesture states
  let initPos = 0;
  let drag = false;
  let transformed = 0;

  const apply = () => {
    track.style.transition = '.3s';
    track.style.transform = `translateX(-${size * counter}px)`;
  };

  const increaseCounter = () => {
    counter = counter >= slides.length - 1 ? 0 : counter + 1;
  };

  const decreaseCounter = () => {
    counter = counter <= 0 ? slides.length - 1 : counter - 1;
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

    const currentPos = e.pageX;
    const lastCounter = slides.length - 1;
    const endPos = size * lastCounter;
    let posX = transformed + currentPos - initPos;

    if (Math.abs(posX) > endPos) posX = -endPos;
    else if (posX > 0) posX = 0;

    track.style.transition = 'none';
    track.style.transform = `translateX(${posX}px)`;
  };

  const gestureEnd = () => {
    drag = false;

    const moved = getTransformed() - transformed;

    if (moved < -100 && counter < slides.length - 1) counter += 1;
    if (moved > 100 && counter > 0) counter -= 1;

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
    trackEl: '.testimonials__carousel-container',
    containerEl: '.testimonials__container',
    nextBtnEl: '.testimonials__next-btn',
    prevBtnEl: '.testimonials__prev-btn',
    slidesEl: '.testimonials__text',
  });
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
