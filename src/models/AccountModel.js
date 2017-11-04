import BaseModel from './BaseModel';

export default class AccountModel extends BaseModel {
    constructor() {
        super('accounts');
    }

    login(params) {
        return this._post('/login', params);
    }

    logout(accessToken) {
        return this._post(
            '/logout?access_token=' + accessToken
        );
    }
}