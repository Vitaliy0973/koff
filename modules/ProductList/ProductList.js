import { addContainer } from "../addContainer";
import { API_URL } from "../../const";

export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('goods');
      this.containerElement = addContainer(this.element, 'goods__container');
      this.isMounted = false;

      this.addEvents();
    }

    return ProductList.instance;
  }

  mount(parent, data, title) {
    this.containerElement.textContent = '';

    const titleElem = document.createElement('h2');

    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' :
      'goods__title visually-hidden';

    this.containerElement.append(titleElem);
    this.updateListElem(data);

    if (this.isMounted) {
      return;
    }

    parent.append(this.element);

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  addEvents() { }

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');

    const listItems = data.map((item) => {
      const listItemElement = document.createElement('li');
      listItemElement.innerHTML = this.getHTMLTemplateListItem(item);

      return listItemElement;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  getHTMLTemplateListItem({ id, images: [image], name: title, price }) {
    console.log(image);
    return `
      <article class="goods__card card">
        <a href="/product/${id}" class="card__link card__link_img">
          <img src="${API_URL}${image}" alt="${title}" class="card__img">
        </a>

        <div class="card__info">
          <h3 class="card__title">
            <a href="/product/${id}" class="card__link">${title}</a>
          </h3>
          <p class="card__price">${price.toLocaleString()}&nbsp;₽</p>
        </div>

        <button class="card__btn" type="button" data-id="${id}">В&nbsp;корзину</button>
        <button class="card__favorite" type="button" data-id="${id}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.41301 13.8733C8.18634 13.9533 7.81301 13.9533 7.58634 13.8733C5.65301 13.2133 1.33301 10.46 1.33301 5.79332C1.33301 3.73332 2.99301 2.06665 5.03967 2.06665C6.25301 2.06665 7.32634 2.65332 7.99967 3.55998C8.67301 2.65332 9.75301 2.06665 10.9597 2.06665C13.0063 2.06665 14.6663 3.73332 14.6663 5.79332C14.6663 10.46 10.3463 13.2133 8.41301 13.8733Z"
              fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </article>
    `;
  }
}