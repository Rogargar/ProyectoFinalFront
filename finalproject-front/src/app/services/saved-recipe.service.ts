import swal  from 'sweetalert';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapperService } from './mapper.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

/**
 * Service of Save recipe
 *
 * @export
 * @class SavedRecipeService
 */
@Injectable({
  providedIn: 'root'
})
export class SavedRecipeService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/savedRecipes`;

  constructor(private _http: HttpClient, private _mapper: MapperService,private router:Router) { }

  /**
   * Get saved recipe by id
   *
   * @param {*} id the save recipe
   * @return {*}
   * @memberof SavedRecipeService
   */
  getSavedRecipeById(id) {
    return this._http.get(this.url + '/' + id).pipe(
      catchError(e => {
        this.router.navigate(['/home']);
        swal('No encuentro ninguna receta guardada con ese id','error', 'error')
        return throwError(e);
      })
    );
  }

  /**
   * Get all recipes save for user
   *
   * @param {*} id the user id
   * @return {*}
   * @memberof SavedRecipeService
   */
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

  /**
   * Get save recipe by id user and id recipe
   *
   * @param {*} idUser the user id
   * @param {*} idRecipe the recipe id
   * @return {*}
   * @memberof SavedRecipeService
   */
  getSavedRecipeByUserAndRecipe(idUser, idRecipe) {
    return this._http.get(this.url + '/user/' + idUser + '/recipes/' + idRecipe);
  }

  /**
   * Save recipe
   *
   * @param {*} savedRecipe
   * @return {*}
   * @memberof SavedRecipeService
   */
  saveSavedRecipe(savedRecipe) {
    return this._http.post(this.url, savedRecipe);
  }

  putSavedRecipe(id, savedRecipe) {
    return this._http.post(this.url + '/' + id, savedRecipe);
  }

  /**
   * Delete recipe of save
   *
   * @param {*} id
   * @return {*}
   * @memberof SavedRecipeService
   */
  deleteSavedRecipe(id) {
    return this._http.delete(this.url + '/' + id);
  }

}
