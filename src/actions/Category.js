import { request } from '../utils';
import { Category } from '../model';
import config from '../config';

export default class {
  static get() {
    return new Promise((resolve, reject) => {
      request.GET(`${config.apiUrl}category`).then((arr) => {
        resolve(arr.map((obj) => {
          return new Category(obj);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
