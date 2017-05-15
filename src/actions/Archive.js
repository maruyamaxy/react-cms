import { request, apiUrl } from '../utils';
import { Archive, Single } from '../model';

export default class {
  static get() {
    return new Promise((resolve, reject) => {
      request.GET(apiUrl('v1', 'post')).then((arr) => {
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
      request.GET(apiUrl('v1', `post/${url}`)).then((obj) => {
        resolve(new Single(obj));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
