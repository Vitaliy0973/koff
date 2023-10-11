export class LocalStorageService {
  get() {
    localStorage.getItem('accessKey');
  }

  set(accessKey) {
    localStorage.setItem('accessKey', accessKey);
  }

  remove() {
    localStorage.removeItem('accessKey');
  }
}
