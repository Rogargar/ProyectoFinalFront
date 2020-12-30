import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { MapperService } from './mapper.service';
import { map } from 'rxjs/operators';

/**
 * User service
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/users`;

  /**
   * Creates an instance of UserService.
   * @param {HttpClient} _http
   * @param {MapperService} _mapper
   * @param {CookieService} cookies
   * @memberof UserService
   */
  constructor(private _http: HttpClient, private _mapper: MapperService, private cookies: CookieService) { }

  /**
   * Get all users
   *
   * @return {*}
   * @memberof UserService
   */
  getUsers() {
    return this._http.get(this.url)
      .pipe(
        map((item: any) => {
          item = item.map((user: any) => {
            return this._mapper.mapUsers(user);
          });
          return item;
        }),
      );
  }

  /**
   * Get all roles
   *
   * @return {*}
   * @memberof UserService
   */
  getRoles() {
    return this._http.get(`${this.enviroment.urlBack}/roles`);
  }

  /**
   * Get role by id
   *
   * @param {*} id the role id
   * @return {*}
   * @memberof UserService
   */
  getRole(id) {
    return this._http.get(`${this.enviroment.urlBack}/roles/${id}`);
  }

  /**
   * Get user by id
   *
   * @param {*} id the user id
   * @return {*}
   * @memberof UserService
   */
  getUserById(id) {
    return this._http.get(this.url + '/' + id);
  }

  /**
   * put user by id
   *
   * @param {*} id the user id
   * @param {*} user the user
   * @return {*}
   * @memberof UserService
   */
  putUser(id,user) {
    return this._http.put(this.url + '/' + id,user);
  }

  /**
   * Register new user
   *
   * @param {*} user the user
   * @return {*}
   * @memberof UserService
   */
  registerUser(user) {
    return this._http.post(this.url, user);
  }

  /**
   * Check email and password
   *
   * @param {*} user the user
   * @return {*}
   * @memberof UserService
   */
  validatorEmailAndPass(user) {
    return this._http.post(`${this.url}/emailPass`, user)
      .pipe(map(data => data));
  }

  /**
   * Get user by email
   *
   * @param {*} email the user email
   * @return {*}
   * @memberof UserService
   */
  getUserByEmail(email) {
    return this._http.get(`${this.url}/email/${email}`);
  }

  /**
   * Set token with id of user
   *
   * @param {string} token
   * @memberof UserService
   */
  setToken(token: string) {
    this.cookies.set('token', token);
  }

  /**
   * Get token
   *
   * @return {*}
   * @memberof UserService
   */
  getToken() {
    return this.cookies.get('token');
  }

  /**
   * delete token
   *
   * @memberof UserService
   */
  deleteToken() {
    this.cookies.delete('token');
  }

  /**
   * Get img for user
   *
   * @param {*} img the name of img
   * @return {*}
   * @memberof UserService
   */
  getImg(img) {
    return this._http.get(`${this.url}/uploads/img/${img}`);
  }

  /**
   * add or edit img for user
   *
   * @param {File} img the img
   * @param {*} idUser the user id
   * @return {*}
   * @memberof UserService
   */
  postUserImg(img: File, idUser) {
    let formData = new FormData();
    formData.append("file", img);
    formData.append("id", idUser);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

      return this._http.request(req);
  }



}
