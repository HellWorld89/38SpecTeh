const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const scrollLock = document.querySelector('.page__body');

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

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    scrollLock.classList.add('scrolllock');
    $('body').css('margin-right', calcScroll()+'px')
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    scrollLock.classList.remove('scrolllock');
    $('body').css('margin-right', '0px')
  }
});
