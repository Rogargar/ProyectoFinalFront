import { RecipeModel } from './../models/recipe/recipe.model';
import { map } from 'rxjs/operators';
import { MapperService } from './mapper.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
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
  getAllRecipesPublicated() {
    return this._http.get(this.url + '/publicated').pipe(
      map((item: any) => {
        item = item.map((label: any) => {
          return this._mapper.mapRecipes(label);
        });
        return item;
      }),
    );
  }

  getAllRecipesPublicatedForFind() {
    return this._http.get(this.url + '/publicated');
  }

  getLastRecipes() {
    return this._http.get(this.url + '/day').pipe(
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

  postRecipe(recipe: RecipeModel) {
    return this._http.post(this.url, recipe);
  }

  postRecipeImg(img: File, idRecipe) {
    let formData = new FormData();
    formData.append("file", img);
    formData.append("id", idRecipe);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

      return this._http.request(req);

    //return this._http.post(this.url + '/upload', formData);
  }

  putRecipe(recipe: RecipeModel, id) {
    return this._http.put(this.url + '/' + id, recipe);
  }


  deleteRecipe(id) {
    return this._http.delete(this.url + '/' + id);
  }

}
