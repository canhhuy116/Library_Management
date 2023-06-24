import { URL_API, URL_APP } from '@/util/constants';
import axios from 'axios';

import qs from 'qs';

const http = axios.create({
  baseURL: URL_API,
  timeout: 99999,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

// // Add an interceptor to include the Access-Control-Allow-Origin header
// http.interceptors.request.use(config => {
//   config.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
//   return config;
// });

export default http;
