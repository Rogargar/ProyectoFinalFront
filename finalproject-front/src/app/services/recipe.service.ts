import { map } from 'rxjs/operators';
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

  getRecipeByOwner(id) {
    return this._http.get(`${this.url}/owner/${id}`);
  }

  getAllRecipes() {
    return this._http.get(this.url).pipe(
      map((item: any) => {
        item = item.map((label: any) => {
          return this._mapper.mapRecipes(label);
        });
        return item;
      }),
    );
  }

  getRecipe(id) {
    return this._http.get(this.url + '/' + id);
  }

  getImg(img) {
    return this._http.get(`${this.url}/uploads/img/${img}`);
  }

}
