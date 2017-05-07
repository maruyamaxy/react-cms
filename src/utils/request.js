import request from 'superagent';

export default class {
  static GET(url) {
    return new Promise((resolve, reject) => {
      request.get(url)
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

  static POST(url, params) {
    return new Promise((resolve, reject) => {
      request.post(url)
      .type('form')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(JSON.stringify(params))
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
