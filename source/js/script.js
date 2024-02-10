/* в этот файл добавляет скрипты*/
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const swiper1 = new Swiper('.swiper2', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 4,
  spaceBetween: 37,
  loop: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

