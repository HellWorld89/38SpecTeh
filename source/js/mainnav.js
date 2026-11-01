document.addEventListener('DOMContentLoaded', () => {
  const navMain = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.main-nav__toggle');
  const navOverlay = document.querySelector('.main-nav__overlay');
  const navLinks = document.querySelectorAll('.main-nav__link');
  const scrollLock = document.querySelector('.page__body');

  if (!navMain || !navToggle) return;

  navMain.classList.remove('main-nav--nojs');

  function calcScroll() {
    const div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  function openMenu() {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    if (scrollLock) scrollLock.classList.add('scrolllock');
    document.body.style.marginRight = calcScroll() + 'px';
  }

  function closeMenu() {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    if (scrollLock) scrollLock.classList.remove('scrolllock');
    document.body.style.marginRight = '0px';
  }

  // СЛУШАЕМ КЛИКИ ПО ВСЕМУ ДОКУМЕНТУ
  document.addEventListener('click', function (e) {
    // 1. Если кликнули на крестик (или на его внутренние элементы)
    if (e.target.closest('.main-nav__toggle')) {
      e.preventDefault();
      e.stopPropagation(); // Останавливаем выполнение других скриптов
      
      if (navMain.classList.contains('main-nav--opened')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // 2. Если кликнули по темному фону (оверлею)
    if (e.target.classList.contains('main-nav__overlay')) {
      closeMenu();
    }

    // 3. Если кликнули по ссылке в меню
    if (e.target.closest('.main-nav__link')) {
      closeMenu();
    }
  });
});