import { router } from "../../main";
import { addContainer } from "../../modules/addContainer";

export class BreadCrumbs {
  static instance;

  constructor() {
    if (!BreadCrumbs.instance) {
      BreadCrumbs.instance = this;
      this.element = document.createElement('div');
      this.element.classList.add('breadcrumbs');

      this.containerElement = addContainer(this.element);
    }

    return BreadCrumbs.instance;
  }

  mount(parent, data) {
    this.render(data);
    parent.append(this.element);
    router.updatePageLinks();
  }

  unmount() {
    this.element.remove();
  }

  render(list) {
    this.containerElement.textContent = '';
    const listElem = document.createElement('ul');
    listElem.classList.add('breadcrumbs__list');

    const breadCrumbsList = [{ text: 'Главная', href: '/' }, ...list];

    const listItems = breadCrumbsList.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('breadcrumbs__item');

      const link = document.createElement('a');
      link.classList.add('breadcrumbs__link');

      link.textContent = item.text;
      if (item.href) {
        link.href = item.href;
      }

      const separator = document.createElement('span');
      separator.classList.add('breadcrumbs__separator');
      separator.innerHTML = '&gt;';

      listItemElem.append(link, separator);

      return listItemElem;
    });

    listElem.append(...listItems);

    this.containerElement.append(listElem);
  }
}