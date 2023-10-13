export class CartButton {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  create(id) {
    const button = document.createElement('button');
    button.classList.add(this.className);
    button.type = 'button';
    button.dataset.id = id;
    button.insertAdjacentHTML('beforeend', this.text);

    button.addEventListener('click', () => {
      console.log('Добавить в корзину');
    });

    return button;
  }
}
