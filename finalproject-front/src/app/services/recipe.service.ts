import { MapperService } from './mapper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/recipes`;

  constructor(private _http: HttpClient, private _mapper: MapperService) { }

  getRecipeByLabel(id) {
    return this._http.get(`${this.url}/label/${id}`);
  }
}
