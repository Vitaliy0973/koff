export class Pagination {
  static instance = null;

  constructor() {
    if (!Pagination.instance) {
      Pagination.instance = this;
      this.pagination = this.createPagination();
    }

    return Pagination.instance;
  }

  update({ currentPage, totalPages, totalProducts, limit }) {
    const width = currentPage * limit;

    this.paginationBar.style.setProperty(
      '--width',
      `calc(${width < totalProducts ? width : totalProducts} / ${totalProducts} * 100%)`,
    );

    this.paginationCurrent.textContent =
      width < totalProducts ? width : width - limit + totalProducts % limit;
    this.paginationTotal.textContent = totalProducts;

    const urlLeft = new URL(window.location.href);
    if (currentPage !== 1) {
      urlLeft.searchParams.set('page', currentPage - 1);
      this.paginationLeft.href = urlLeft.pathname + urlLeft.search;
    } else {
      this.paginationLeft.removeAttribute('href');
    }

    const urlRight = new URL(window.location.href);
    if (currentPage !== totalPages) {
      urlRight.searchParams.set('page', currentPage + 1);
      this.paginationRight.href = urlRight.pathname + urlRight.search;
    } else {
      this.paginationRight.removeAttribute('href');
    }

    return this;
  }

  createPagination() {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    this.paginationBar = document.createElement('div');
    this.paginationBar.classList.add('pagination__bar');
    // this.paginationBar.style.cssText = '--width: calc(12 / 31 * 100%);';

    const paginationArrays = document.createElement('div');
    paginationArrays.classList.add('pagination__arrays');

    this.paginationLeft = document.createElement('a');
    this.paginationLeft.classList.add('pagination__left')
    this.paginationLeft.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2.86395 8.00001L8.52528 2.18201C8.5719 2.13512 8.60874 2.07946 8.6337 2.01824C8.65866 1.95702 8.67122 1.89145 8.67068 1.82534C8.67013 1.75923 8.65647 1.69389 8.6305 1.63309C8.60453 1.57229 8.56676 1.51725 8.51938 1.47114C8.472 1.42504 8.41594 1.38879 8.35445 1.36449C8.29297 1.34019 8.22727 1.32833 8.16117 1.32959C8.09507 1.33085 8.02988 1.3452 7.96936 1.37182C7.90885 1.39844 7.85421 1.4368 7.80862 1.48468L1.80862 7.65134C1.7178 7.74469 1.66699 7.86978 1.66699 8.00001C1.66699 8.13024 1.7178 8.25533 1.80862 8.34868L7.80862 14.5153C7.85421 14.5632 7.90885 14.6016 7.96936 14.6282C8.02988 14.6548 8.09507 14.6692 8.16117 14.6704C8.22727 14.6717 8.29297 14.6598 8.35445 14.6355C8.41594 14.6112 8.472 14.575 8.51938 14.5289C8.56676 14.4828 8.60453 14.4277 8.6305 14.3669C8.65647 14.3061 8.67013 14.2408 8.67068 14.1747C8.67122 14.1086 8.65866 14.043 8.6337 13.9818C8.60874 13.9206 8.5719 13.8649 8.52528 13.818L2.86395 8.00001Z"
          fill="#1C1C1C" />
      </svg>
    `;

    const paginationInfo = document.createElement('p');
    paginationInfo.classList.add('pagination__info');

    this.paginationCurrent = document.createElement('span');
    this.paginationCurrent.classList.add('pagination__carent');

    const paginationSeparator = document.createTextNode('из');

    this.paginationTotal = document.createElement('span');
    this.paginationTotal.classList.add('pagination__total');

    this.paginationRight = document.createElement('a');
    this.paginationRight.classList.add('pagination__right')
    this.paginationRight.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M13.136 8.00001L7.47472 2.18201C7.4281 2.13512 7.39126 2.07946 7.3663 2.01824C7.34134 1.95702 7.32878 1.89145 7.32932 1.82534C7.32987 1.75923 7.34353 1.69389 7.3695 1.63309C7.39547 1.57229 7.43324 1.51725 7.48062 1.47114C7.528 1.42504 7.58406 1.38879 7.64555 1.36449C7.70703 1.34019 7.77273 1.32833 7.83883 1.32959C7.90493 1.33085 7.97012 1.3452 8.03064 1.37182C8.09115 1.39844 8.14579 1.4368 8.19138 1.48468L14.1914 7.65134C14.2822 7.74469 14.333 7.86978 14.333 8.00001C14.333 8.13024 14.2822 8.25533 14.1914 8.34868L8.19138 14.5153C8.14579 14.5632 8.09115 14.6016 8.03064 14.6282C7.97012 14.6548 7.90493 14.6692 7.83883 14.6704C7.77273 14.6717 7.70703 14.6598 7.64555 14.6355C7.58406 14.6112 7.528 14.575 7.48062 14.5289C7.43324 14.4828 7.39547 14.4277 7.3695 14.3669C7.34353 14.3061 7.32987 14.2408 7.32932 14.1747C7.32878 14.1086 7.34134 14.043 7.3663 13.9818C7.39126 13.9206 7.4281 13.8649 7.47472 13.818L13.136 8.00001Z"
          fill="#1C1C1C" />
      </svg>
    `;

    paginationInfo.append(
      this.paginationCurrent,
      paginationSeparator,
      this.paginationTotal,
    );

    paginationArrays.append(
      this.paginationLeft,
      paginationInfo,
      this.paginationRight,
    );

    pagination.append(this.paginationBar, paginationArrays);

    return pagination;
  }

  mount(parent) {
    parent.append(this.pagination);

    return this;
  }
}

/*
<div class="pagination">
  <div class="pagination__bar" style="--width: calc(12 / 31 * 100%);"></div>

  <div class="pagination__arrays">

    <button class="pagination__left">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2.86395 8.00001L8.52528 2.18201C8.5719 2.13512 8.60874 2.07946 8.6337 2.01824C8.65866 1.95702 8.67122 1.89145 8.67068 1.82534C8.67013 1.75923 8.65647 1.69389 8.6305 1.63309C8.60453 1.57229 8.56676 1.51725 8.51938 1.47114C8.472 1.42504 8.41594 1.38879 8.35445 1.36449C8.29297 1.34019 8.22727 1.32833 8.16117 1.32959C8.09507 1.33085 8.02988 1.3452 7.96936 1.37182C7.90885 1.39844 7.85421 1.4368 7.80862 1.48468L1.80862 7.65134C1.7178 7.74469 1.66699 7.86978 1.66699 8.00001C1.66699 8.13024 1.7178 8.25533 1.80862 8.34868L7.80862 14.5153C7.85421 14.5632 7.90885 14.6016 7.96936 14.6282C8.02988 14.6548 8.09507 14.6692 8.16117 14.6704C8.22727 14.6717 8.29297 14.6598 8.35445 14.6355C8.41594 14.6112 8.472 14.575 8.51938 14.5289C8.56676 14.4828 8.60453 14.4277 8.6305 14.3669C8.65647 14.3061 8.67013 14.2408 8.67068 14.1747C8.67122 14.1086 8.65866 14.043 8.6337 13.9818C8.60874 13.9206 8.5719 13.8649 8.52528 13.818L2.86395 8.00001Z"
          fill="#1C1C1C" />
      </svg>
    </button>

    <p class="pagination__info">
      <span class="pagination__carent">12</span>
      из
      <span class="pagination__total">31</span>
    </p>

    <button class="pagination__right">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M13.136 8.00001L7.47472 2.18201C7.4281 2.13512 7.39126 2.07946 7.3663 2.01824C7.34134 1.95702 7.32878 1.89145 7.32932 1.82534C7.32987 1.75923 7.34353 1.69389 7.3695 1.63309C7.39547 1.57229 7.43324 1.51725 7.48062 1.47114C7.528 1.42504 7.58406 1.38879 7.64555 1.36449C7.70703 1.34019 7.77273 1.32833 7.83883 1.32959C7.90493 1.33085 7.97012 1.3452 8.03064 1.37182C8.09115 1.39844 8.14579 1.4368 8.19138 1.48468L14.1914 7.65134C14.2822 7.74469 14.333 7.86978 14.333 8.00001C14.333 8.13024 14.2822 8.25533 14.1914 8.34868L8.19138 14.5153C8.14579 14.5632 8.09115 14.6016 8.03064 14.6282C7.97012 14.6548 7.90493 14.6692 7.83883 14.6704C7.77273 14.6717 7.70703 14.6598 7.64555 14.6355C7.58406 14.6112 7.528 14.575 7.48062 14.5289C7.43324 14.4828 7.39547 14.4277 7.3695 14.3669C7.34353 14.3061 7.32987 14.2408 7.32932 14.1747C7.32878 14.1086 7.34134 14.043 7.3663 13.9818C7.39126 13.9206 7.4281 13.8649 7.47472 13.818L13.136 8.00001Z"
          fill="#1C1C1C" />
      </svg>
    </button>

  </div>
</div>
*/