import { likeSvg } from '../../features/LikeSvg/LikeSvg';
import { Logo } from '../../features/Logo/Logo';
import { addContainer } from '../addContainer';

export class Header {
  static instance = null;

  constructor() {
    if (!Header.instance) {
      Header.instance = this;

      this.element = document.createElement('header');
      this.element.classList.add('header');

      this.containerElement = addContainer(this.element, 'header__container');
      this.isMounted = false;
    }
    return Header.instance;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const logo = new Logo('header').create();
    const searchForm = this.getSearchForm();
    const navigation = this.getNavigation();

    this.containerElement.append(logo, searchForm, navigation);

    document.body.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getSearchForm() {
    const searchForm = document.createElement('form');
    searchForm.classList.add('header__search');
    searchForm.method = 'get';

    const input = document.createElement('input');
    input.classList.add('header__input');
    input.type = 'search';
    input.name = 'search';
    input.placeholder = 'Введите запрос';

    const button = document.createElement('button');
    button.classList.add('header__btn');
    button.type = 'submit';
    button.insertAdjacentHTML('beforeend', `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.66634 14C11.1641 14 13.9997 11.1645 13.9997 7.66671C13.9997 4.1689 11.1641 1.33337 7.66634 1.33337C4.16854 1.33337 1.33301 4.1689 1.33301 7.66671C1.33301 11.1645 4.16854 14 7.66634 14Z"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14.6663 14.6667L13.333 13.3334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    `);

    searchForm.append(input, button);

    return searchForm;
  }

  getNavigation() {
    const navigation = document.createElement('nav');
    navigation.classList.add('header__control');

    const favoriteLink = document.createElement('a');
    favoriteLink.classList.add('header__link');
    favoriteLink.href = '/favorite';

    const favoriteText = document.createElement('span');
    favoriteText.classList.add('header__link-text');
    favoriteText.textContent = 'Избранное';

    favoriteLink.append(favoriteText);

    likeSvg().then(svg => {
      favoriteLink.append(svg);
    });

    const cartLink = document.createElement('a');
    cartLink.classList.add('header__link');
    cartLink.href = '/cart';

    const cartText = document.createElement('span');
    cartText.classList.add('header__link-text');
    cartText.textContent = 'Корзина';

    const cartCount = document.createElement('span');
    cartCount.classList.add('header__count');
    cartCount.textContent = '(0)';

    cartLink.append(cartText, cartCount);
    cartLink.insertAdjacentHTML('beforeend', `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.87329 1.33337L3.45996 3.75337" stroke="#1C1C1C" stroke-miterlimit="10" stroke-linecap="round"
          stroke-linejoin="round" />
        <path d="M10.127 1.33337L12.5403 3.75337" stroke="#1C1C1C" stroke-miterlimit="10" stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          d="M1.33301 5.23336C1.33301 4.00002 1.99301 3.90002 2.81301 3.90002H13.1863C14.0063 3.90002 14.6663 4.00002 14.6663 5.23336C14.6663 6.66669 14.0063 6.56669 13.1863 6.56669H2.81301C1.99301 6.56669 1.33301 6.66669 1.33301 5.23336Z"
          stroke="#1C1C1C" />
        <path d="M6.50684 9.33337V11.7" stroke="#1C1C1C" stroke-linecap="round" />
        <path d="M9.57324 9.33337V11.7" stroke="#1C1C1C" stroke-linecap="round" />
        <path
          d="M2.33301 6.66663L3.27301 12.4266C3.48634 13.72 3.99967 14.6666 5.90634 14.6666H9.92634C11.9997 14.6666 12.3063 13.76 12.5463 12.5066L13.6663 6.66663"
          stroke="#1C1C1C" stroke-linecap="round" />
      </svg>
    `);

    navigation.append(favoriteLink, cartLink);

    this.countElement = cartCount;

    return navigation;
  }

  changeCount(n) {
    this.countElement.textContent = `${n}`;
  }
}