import { addContainer } from "../addContainer";

export class Order {
  static instance = null;

  constructor() {
    if (!Order.instance) {
      Order.instance = this;

      this.element = document.createElement('section');
      this.element.classList.add('order');

      this.containerElement = addContainer(this.element, 'order__container');

      this.isMounted = false;
    }
    return Order.instance;
  }

  mount(parent, data) {
    if (this.isMounted) {
      return;
    }

    const orderWrap = this.orderWrap();
    const orderTop = this.orderTop(data);
    const orderData = this.orderData(data);
    const orderLink = this.orderLink();

    orderWrap.append(orderTop, orderData, orderLink);
    this.containerElement.append(orderWrap);

    this.isMounted = true;

    parent.append(this.element);
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  orderWrap() {
    const orderWrap = document.createElement('div');
    orderWrap.classList.add('order__wrap');

    return orderWrap;
  }

  orderTop(data) {
    const orderTop = document.createElement('div');
    orderTop.classList.add('order__top');

    const title = document.createElement('h2');
    title.classList.add('order__title');
    title.textContent = 'Заказ успешно размещен';

    const price = document.createElement('p');
    price.classList.add('order__price');
    price.textContent = `${data.totalPrice} ₽`;

    const orderNumber = document.createElement('p');
    orderNumber.classList.add('order__order-number');
    orderNumber.textContent = `№${data.orderNumber}`;

    orderTop.append(title, price, orderNumber);

    this.totalPrice = price;
    this.orderNumber = orderNumber;

    return orderTop;
  }

  orderData(data) {
    const orderData = document.createElement('div');
    orderData.classList.add('order__data');

    orderData.insertAdjacentHTML(
      'beforeend',
      `
        <h3 class="order__subtitle">Данные доставки</h3>
        <table class="order__table table">
          <tr class="order__row table__row">
            <td class="order__field table__field">Получатель</td>
            <td class="order__value table__value">${data.userName}</td>
          </tr>
          <tr class="order__row table__row">
            <td class="order__field table__field">Телефон</td>
            <td class="order__value table__value">${data.phone}</td>
          </tr>
          <tr class="order__row table__row">
            <td class="order__field table__field">E-mail</td>
            <td class="order__value table__value">${data.mail}</td>
          </tr>
          <tr class="order__row table__row">
            <td class="order__field table__field">Адрес доставки</td>
            <td class="order__value table__value">${data.address}</td>
          </tr>
          <tr class="order__row table__row">
            <td class="order__field table__field">Способ оплаты</td>
            <td class="order__value table__value">${data.payType}</td>
          </tr>
          <tr class="order__row table__row">
            <td class="order__field table__field">Способ получения</td>
            <td class="order__value table__value">${data.delivery}</td>
          </tr>
        </table>
      `
    );

    return orderData;
  }

  orderLink() {
    const link = document.createElement('a');
    link.classList.add('order__link');
    link.href = location.origin;
    link.textContent = 'На главную';

    return link;
  }

  changeTotalPrice(totalPrice) {
    this.totalPrice.textContent = '';
    this.totalPrice.insertAdjacentHTML('beforeend', `${totalPrice}&nbsp;₽`);
  }

  changeOrderNumber(orderNumber) {
    this.orderNumber.textContent = '';
    this.orderNumber.insertAdjacentHTML('beforeend', `№${orderNumber}`);
  }
}