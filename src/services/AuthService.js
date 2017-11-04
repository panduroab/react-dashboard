import AccountModel from '../models/AccountModel';
const account = new AccountModel();
export default class AuthService {

    login(credentials, next) {
        account.login(credentials)
            .then(authInfo => {
                return next(null, authInfo);
            })
            .catch(next);
    }

    logout() {

    }

    resetToken() {

    }

    isAuthenticated() {
    }

    getCurrentAccount() {

    }

    getPermissions() {

    }
}