import config from '../config';

export default (version, path) => {
  const versionPath = `${version}/${path}`;
  return config.apiUrl + versionPath;
}
