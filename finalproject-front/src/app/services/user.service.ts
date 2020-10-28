import { CookieService } from 'ngx-cookie-service';
import { UserModel } from './../models/user/user.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MapperService } from './mapper.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/users`;

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private _http: HttpClient, private _mapper: MapperService, private cookies: CookieService) { }

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
  getUserById(id) {
    return this._http.get(this.url + '/' + id);
  }

  registerUser(user) {
    return this._http.post(this.url, user);
  }

  validatorEmailAndPass(user) {
    return this._http.post(`${this.url}/emailPass`, user,
      { headers: this.headers })
      .pipe(map(data => data));
  }

  getUserByEmail(email) {
    return this._http.get(`${this.url}/email/${email}`);
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }
  deleteToken() {
    this.cookies.delete('token');
  }

}
