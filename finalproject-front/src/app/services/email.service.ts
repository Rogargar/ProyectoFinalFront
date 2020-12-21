import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { MapperService } from './mapper.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/email`;

  constructor(private _http: HttpClient, private _mapper: MapperService) { }

  sendEmail(email) {
    return this._http.post(`${this.url}/send`,email);
  }

}
