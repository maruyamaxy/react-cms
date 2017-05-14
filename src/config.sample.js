const env = process.env.NODE_ENV || 'develop';

function config(setting) {
  return setting[env];
}

const apiUrl = config({
  develop: '//localhost:9000/v1/',
  production: '//api.hoge.jp/v1/',
});

const siteTitle = config({
  develop: 'CMS',
  production: 'CMS',
});

const url = config({
  develop: '//localhost:5000/',
  production: '//hoge.jp/',
});

const fbAppId = config({
  develop: '1',
  production: '1',
});

export default {
  apiUrl,
  siteTitle,
  url,
  fbAppId,
};
