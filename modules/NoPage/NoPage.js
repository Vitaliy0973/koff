import { addContainer } from "../addContainer";

export class NoPage {
  static instance = null;

  constructor() {
    if (!NoPage.instance) {
      NoPage.instance = this;

      this.element = document.createElement('div');
      this.containerElement = addContainer(this.element);

      this.isMounted = false;
    }
    return NoPage.instance;
  }

  mount(parent) {
    if (this.isMounted) {
      return;
    }

    this.renderPage();

    parent.append(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  renderPage() {
    this.containerElement.insertAdjacentHTML('beforeend', `
      <h1 style="margin-top: 20vh; margin-bottom: 20px; text-align: center;">
        Страница не найдена
      </h1>
      <p style="text-align: center;">
        Через 5 минут вы будете перенаправлены
        <a href="/" style="color: blue;"> на главную </a>
        страницу.
      </p>
    `);
  }
}