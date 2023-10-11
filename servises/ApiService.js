import axios from "axios";
import { API_URL } from "../const";
import { LocalStorageService } from "./storageService";

export class ApiService {
  #apiUrl = API_URL;

  constructor() {
    this.accessKey = new LocalStorageService().get();
    console.log('accessKey: ', this.accessKey);
  }

  async getAccessKey() {
    try {
      if (!this.accessKey) {
        const response = await axios.get(`${this.#apiUrl}api/users/accessKey`);
        this.accessKey = response.data.accessKey;
        new LocalStorageService().set(this.accessKey);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getData(pathname, params = {}) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }
    try {
      const response = await axios.get(`${this.#apiUrl}${pathname}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`,
        },
        params,
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        new LocalStorageService().remove();

        return this.getData(pathname, params);
      } else {
        console.log(error);
      }
    }
  }

  async getProducts(page = 1, limit = 12, list, category, search) {
    return await this.getData('api/products', {
      page,
      limit,
      list,
      category,
      search,
    });
  }

  async getProductCategories() {
    return await this.getData('api/productCategories');
  }

  async getProductById(id) {
    return await this.getData(`api/products/${id}`);
  }
}