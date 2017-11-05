import { environment as env } from '../environments/environment';
import axios from 'axios';

export default class BaseModel {
  baseUrl = '';

  constructor(plural) {
    const base = [
      env.host,
      env.path,
      plural
    ];
    this.baseUrl = base.join('/');
  }

  create(params) {
    return this._post('/', params);
  }

  find(filter = {}) {
    filter = filter ? { filter } : {};
    return this._get('/', null, filter);
  }

  findById(id, filter = {}) {
    filter = filter ? { filter } : {};
    return this._get('/' + id, null, filter);
  }

  update(id, params) {
    return this._patch('/', id, params);
  }

  deleteById(id) {
    return this._delete('/', id);
  }

  _post(endpoint, params = null, headers = null) {
    return this._request(this.baseUrl + endpoint, 'POST', params, {}, headers);
  }

  _get(endpoint, params = null, query = {}, headers = null) {
    return this._request(this.baseUrl + endpoint, 'GET', params, query, headers);
  }

  _delete(endpoint, params, headers = null) {
    return this._request(this.baseUrl + endpoint, 'DELETE', params, {}, headers);
  }

  _put(endpoint, id, params, headers = null) {
    return this._request(this.baseUrl + endpoint, 'PUT', { 'id': id, 'params': params }, {}, headers);
  }

  _patch(endpoint, id, params, headers = null) {
    return this._request(this.baseUrl + endpoint, 'PATCH', { 'id': id, 'params': params }, {}, headers);
  }

  _request(url, method, params = null, query = {}, headers = null) {

    let data = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (sessionStorage.getItem('accessToken')) {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('accessToken');
    }

    if (headers) {
      data.headers = Object.assign(data.headers, headers);
    }

    if (method === 'POST') {
      data = Object.assign(data, { 'data': JSON.stringify(params) });
    }

    if (method === 'DELETE') {
      url += '/' + params;
    }

    if (method === 'PUT' || method === 'PATCH') {
      url += '/' + params.id;
      data = Object.assign(data, { 'data': JSON.stringify(params.params) });
    }

    // Make sure query is an Object
    query = query || {};

    // Add filter to params object after parsing it to JSON
    if (query['filter']) {
      query['filter'] = JSON.stringify(query['filter']);
    }

    // Generate an array of query strings
    let queryArray = [];
    Object.keys(query).forEach(key => {
      if (query[key]) {
        // Only push when it's not empty
        queryArray.push(`${key}=${encodeURIComponent(query[key])}`);
      }
    });

    // Only add the query string when there is at least one query parameter
    if (queryArray.length) {
      url += `?${queryArray.join('&')}`
    }
    let config = Object.assign(data, { "url": url });
    // Return axios Promise
    /**
     * .then(res => {
     *  console.log(`response.data ${response.data}`);
     *  console.log(`response.status ${response.status}`);
     *  console.log(`response.statusText ${response.statusText}`);
     *  console.log(`response.headers ${response.headers}`);
     *  console.log(`response.config ${response.config}`);
     * })
     * .catch(error => {
     *  if (error.response) {
     *    // The request was made and the server responded with a status code
     *    // that falls out of the range of 2xx
     *    console.log(`error.response.data ${error.response.data}`);
     *    console.log(`error.response.status ${error.response.status}`);
     *    console.log(`error.response.headers ${error.response.headers}`);
     *  } else if (error.request) {
     *    // The request was made but no response was received
     *    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
     *    // http.ClientRequest in node.js
     *    console.log(`error.request ${error.request}`);
     *  } else {
     *    // Something happened in setting up the request that triggered an Error
     *    console.log(`error.message ${error.message}`);
     *  }
     * console.log(`error.config ${error.config}`);
     * }
     */
    return axios(config);
  }
}