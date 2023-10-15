import Navigo from 'navigo';
import 'normalize.css';
import { Footer } from './modules/Footer/Footer';
import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Order } from './modules/Order/Order';
import './style.scss';

import { data } from './order-data.js';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './servises/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { NoPage } from './modules/NoPage/NoPage';
import { FavoriteService } from './servises/StorageService';
import { Pagination } from './features/Pagination/Pagination';

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
  const api = new ApiService();
  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  api.getProductCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  productSlider();

  router
    .on('/', async () => {
      const products = await api.getProducts();
      console.log('На главной.')
      new ProductList().mount(new Main().element, products);
      router.updatePageLinks();
    }, {
      leave(done) {
        new ProductList().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on('/category', async ({ params: { slug, page } }) => {
      const { data: products, pagination } = await api.getProducts({
        category: slug,
        page: page || 1,
      });
      new ProductList().mount(new Main().element, products, slug);
      new Pagination()
        .mount(new ProductList().containerElement)
        .update(pagination);
      router.updatePageLinks();
    }, {
      leave(done) {
        new ProductList().unmount();
        done();
      },
    })
    .on('/favorite', async () => {
      console.log('favorite');
      const params = {
        list: new FavoriteService().get(),
      };
      const product = await api.getProducts(params);
      new ProductList().mount(new Main().element, product.data, 'Избранное',
        'Вы ничего не добавили в избранное.');
      router.updatePageLinks();

    }, {
      leave(done) {
        new ProductList().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
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
    }, {
      leave(done) {
        new Order().unmount();
        done();
      }
    })
    .notFound(() => {
      new NoPage().mount(new Main().element);

      setTimeout(() => {
        router.navigate('/');
      }, 5000);
    }, {
      leave(done) {
        new NoPage().unmount();
        done();
      }
    });
  router.resolve();
}

init();
