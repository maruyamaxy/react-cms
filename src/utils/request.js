import request from 'superagent';
import apiUrl from './apiUrl';

export default class {
  /**
   * [GET用のメソッド]
   * @param {string} url [GETのURL]
   */
  static GET(url) {
    return new Promise((resolve, reject) => {
      request.get(url)
      .end((err, res) => {
        if (res) {
          resolve(res.body);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * [JSONのPOST用のメソッド]
   * @param {[type]} url    [POSTのURL]
   * @param {[type]} params [POSTする配列]
   */
  static POST(url, params) {
    return new Promise((resolve, reject) => {
      request.post(url)
      .type('form')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(params)
      .end((err, res) => {
        if (res) {
          resolve(res.body);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
   * [ファイルアップロード用のメソッド]
   * @param {[type]} url   [POST先のURL（pathのみ）]
   * @param {[type]} files [POSTするFILEオブジェクト]
   */
  static UPLOAD(url, files) {
    return new Promise((resolve, reject) => {
      request.post(apiUrl('v1', url))
      .attach('file', files[0])
      .end((err, res) => {
        if (res) {
          resolve(JSON.parse(res.text));
          // resolve(res.body);
        } else {
          reject(err);
        }
      });
    });
  }
}
