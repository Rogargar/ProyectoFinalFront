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

}
