import axios from 'axios';
import {
  handleRequestHeader,
  handleAuth,
  handleNetworkError,
  handleAuthError,
  handleGeneralError,
} from './tool';

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30 * 1000, // 30 秒超时
  headers: {
    'Content-Type': 'application/json', // 默认 Content-Type
  },
});

request.interceptors.request.use((config) => {
  config = handleRequestHeader(config)
	config = handleAuth(config)
	return config
})

request.interceptors.response.use((response) => {
  if (response.status !== 200) {
    return Promise.reject(response.data);
  }
  handleAuthError(response.data.errno);
  handleGeneralError(response.data.errno, response.data.errmsg);

  return response;
}, (err) => {
  handleNetworkError(err.response.status);
  Promise.reject(err);
})

function formatRes (data, clearFn) {
  if (clearFn !== undefined) {
    return clearFn(data);
  } else {
    return data
  }
}

export const Get = (url, params = {}, clearFn) => {
  new Promise((resolve) => {
    request
      .get(url, { params })
      .then(response => {
        let res;
        res = formatRes(response.data, clearFn);
        resolve([null, res]);
      })
      .catch(error => {
        resolve([error, null]);
      });
  });
}

export const Post = (url, data = {}, params = {}, clearFn) => {
  new Promise((resolve) => {
    request
      .post(url, data, params)
      .then(response => {
        let res;
        res = formatRes(response.data, clearFn);
        resolve([null, res]);
      })
      .catch(error => {
        resolve([error, null]);
      });
  });
}
