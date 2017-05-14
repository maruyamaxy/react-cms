import { request } from '../utils';
import { Archive, Single } from '../model';
import config from '../config';

export default class {
  static get() {
    return new Promise((resolve, reject) => {
      request.GET(`${config.apiUrl}post`).then((arr) => {
        resolve(arr.map((obj) => {
          return new Archive(obj);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }


  static getSigleArticle(url) {
    return new Promise((resolve, reject) => {
      request.GET(`${config.apiUrl}post/${url}`).then((obj) => {
        resolve(new Single(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
