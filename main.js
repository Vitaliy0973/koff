import Navigo from 'navigo';
import 'normalize.css';
import { Footer } from './modules/Footer/Footer';
import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Order } from './modules/Order/Order';
import './style.scss';

import { data } from './order-data.js';

const productSlider = () => {
  Promise.all([
    import('swiper'),
    import('swiper/modules'),
    import('swiper/css'),
  ]).then(([Swiper, { Navigation, Thumbs }]) => {
    const swiperThumbnails = new Swiper.default(".product__slider-thumbnails", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    const swiper2 = new Swiper.default(".product__slider-main", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".product__arrow_next",
        prevEl: ".product__arrow_prev",
      },
      modules: [Navigation, Thumbs],
      thumbs: {
        swiper: swiperThumbnails,
      },
    });
  });
};

const init = () => {
  productSlider();

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });

  router
    .on('/', () => {
      console.log('На главной.')
    })
    .on('/category', () => {
      console.log('Category')
    })
    .on('/favorite', () => {
      console.log('favorite')
    })
    .on('/search', () => {
      console.log('search')
    })
    .on('/product/:id', (obj) => {
      console.log('product obj: ', obj)
    })
    .on('/cart', () => {
      console.log('cart')
    })
    .on('/order', () => {
      new Order().mount(new Main().element, data);
    })
    .notFound(() => {
      document.body.innerHTML = '<h1 style="margin-top: 45vh; text-align: center;">Страница не найдена</h1>';
    });
  router.resolve();
}

init();
