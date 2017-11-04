import { environment as env } from '../environments/environment';

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
      data.headers = Object.assign(data.headers, {
        'Authorization': sessionStorage.getItem('accessToken')
      });
    }

    if (headers) {
      data.headers = Object.assign(data.headers, headers);
    }

    if (method === 'POST') {
      data = Object.assign(data, { 'body': JSON.stringify(params) });
    }

    if (method === 'DELETE') {
      url += '/' + params;
    }

    if (method === 'PUT' || method === 'PATCH') {
      url += '/' + params.id;
      data = Object.assign(data, { 'body': JSON.stringify(params.params) });
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

    return new Promise((resolve, reject) => {
      return fetch(url, data)
        .then((response) => {
          if (!response.ok) {
            throw response;
          } else {
            return response.json();
          }
        })
        .then(resolve)
        .catch(res => {
          if (typeof res.json === 'function') {
            res.json().then((e) => {
              return reject(e.error);
            });
          } else {
            return reject(res);
          }
        });
    });
  }
}