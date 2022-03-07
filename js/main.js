window.addEventListener('load', () => {
  const swiper = new Swiper('.slider', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    navigation: {
      nextEl: '.slider__next-btn',
      prevEl: '.slider__prev-btn',
    },
    resistanceRatio: 0,
    grabCursor: true,
  });

  const swiper2 = new Swiper('.testimonials__carousel', {
    spaceBetween: 100,
    resistanceRatio: 0,
    navigation: {
      nextEl: '.testimonials__next-btn',
      prevEl: '.testimonials__prev-btn',
    },
    loop: true,
    autoplay: true,
    grabCursor: true,
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
