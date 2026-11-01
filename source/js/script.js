import './pagination.js';
import './mainnav.js';
import './formsend.js';
import './quiz.js';

// Проверяем, дождались ли мы полной загрузки DOM (хотя type="module" это гарантирует, лишним не будет)
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация главного слайдера
  const mainSwiperEl = document.querySelector('.swiper');
  if (mainSwiperEl) {
    new Swiper(mainSwiperEl, {
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      autoplay: { delay: 6000 },
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      scrollbar: { el: '.swiper-scrollbar' },
    });
  }

  // Инициализация каталога
  const catalogSwiperEl = document.querySelector('.swiper2');
  if (catalogSwiperEl) {
    new Swiper(catalogSwiperEl, {
      direction: 'horizontal',
      slidesPerView: 1,
      loop: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      pagination: { el: '.swiper-pagination' },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      scrollbar: { el: '.swiper-scrollbar' },
    });
  }
});