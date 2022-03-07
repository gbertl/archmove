window.addEventListener('load', () => {
  const swiper = new Swiper('.slider', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    navigation: {
      nextEl: '.slider__next-btn',
      prevEl: '.slider__prev-btn',
    },
    resistanceRatio: 0,
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
