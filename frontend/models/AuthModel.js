import Model from './Model';

export default class AuthModel extends Model {
  url = 'auth';

  login(email, password) {
    return this._post(`${this.baseUrl}/${this.url}/login`, {
      email: email,
      password: password
    });
  }

  logout() {
    return this._post(`${this.baseUrl}/${this.url}/logout`);
  }

  forgotpassword(email) {
    return this._post(`${this.baseUrl}/${this.url}/forgotpassword`, {
      email: email
    });
  }

  checktoken(token) {
    return this._get(`${this.baseUrl}/${this.url}/checktoken/${token}`);
  }

  resetpassword(token, password) {
    return this._post(`${this.baseUrl}/${this.url}/resetpassword/${token}`, {
      password: password
    });
  }


}
