import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapperService } from './mapper.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedRecipeService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/savedRecipes`;

  constructor(private _http: HttpClient, private _mapper: MapperService) { }

  getSavedRecipeById(id) {
    return this._http.get(this.url + '/' + id);
  }

  getSavedRecipeByUser(id) {
    return this._http.get(this.url + '/user/' + id)
      .pipe(
        map((item: any) => {
          item = item.map((recipe: any) => {
            return this._mapper.mapSavedRecipe(recipe);
          });
          return item;
        }),
      );
  }

  getSavedRecipeByUserAndRecipe(idUser, idRecipe) {
    return this._http.get(this.url + '/user/' + idUser + '/recipes/' + idRecipe);
  }

  saveSavedRecipe(savedRecipe) {
    return this._http.post(this.url, savedRecipe);
  }

  putSavedRecipe(id, savedRecipe) {
    return this._http.post(this.url + '/' + id, savedRecipe);
  }

  deleteSavedRecipe(id) {
    return this._http.delete(this.url + '/' + id);
  }

}
