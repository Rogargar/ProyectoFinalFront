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

  private headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  private url = `${this.enviroment.urlBack}/users`;

  constructor(private _http: HttpClient, private _mapper: MapperService) { }

  getUsers() {
    return this._http.get(this.url, {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      }
    })
      .pipe(
        map((item: any) => {
          item = item.map((user: any) => {
            return this._mapper.mapUsers(user);
          });
          return item;
        }),
      );
  }

}
