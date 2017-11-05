import AccountModel from '../models/AccountModel';
const account = new AccountModel();
export default class AuthService {

  login(credentials, next) {
    account.login(credentials)
      .then(response => {
        // Saves accessToken
        sessionStorage.setItem('accessToken', response.data.id);
        // Retrieve user info
        account.findById(response.data.userId)
          .then(response => {
            localStorage.setItem('currentAccount', response.data);
            return next(null, response.data);
          })
          .catch(next);
      })
      .catch(next);
  }

  logout(next) {
    account.logout(sessionStorage.getItem('accessToken'))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("Logout error: ", JSON.stringify(error));
      });
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("currentAccount");
    return next();
  }

  resetToken() {

  }

  isAuthenticated() {
    // TODO Ping server
    return sessionStorage.getItem('accessToken');
  }

  getCurrentAccount() {

  }

  getPermissions() {

  }
}