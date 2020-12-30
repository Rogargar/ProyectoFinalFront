import { Router } from '@angular/router';
import swal from 'sweetalert';
import { RecipeModel } from './../models/recipe/recipe.model';
import { catchError, map } from 'rxjs/operators';
import { MapperService } from './mapper.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

/**
 * Recipe service
 *
 * @export
 * @class RecipeService
 */
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private enviroment = environment;

  private url = `${this.enviroment.urlBack}/recipes`;

  constructor(private router:Router,private _http: HttpClient, private _mapper: MapperService) { }

  /**
   * Get recipe by id label
   *
   * @param {*} id the label id
   * @return {*}
   * @memberof RecipeService
   */
  getRecipeByLabel(id) {
    return this._http.get(`${this.url}/label/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/home']);
        swal('No se encuentra el label con ese id','error', 'error')
        return throwError(e);
      })
    );
  }

  /**
   * Get recipe by id owner
   *
   * @param {*} id the owner id
   * @return {*}
   * @memberof RecipeService
   */
  getRecipeByOwner(id) {
    return this._http.get(`${this.url}/owner/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/home']);
        swal('No se encuentra el usuario con ese id','error', 'error')
        return throwError(e);
      })
    );;
  }

  /**
   * Get all recipes
   *
   * @return {*}
   * @memberof RecipeService
   */
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

  /**
   * Get all recipes with state is publicated
   *
   * @return {*}
   * @memberof RecipeService
   */
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

    /**
   * Get all recipes with state is publicated
   *
   * @return {*}
   * @memberof RecipeService
   */
  getAllRecipesPublicatedForFind() {
    return this._http.get(this.url + '/publicated');
  }

  /**
   * Get last recipes
   *
   * @return {*}
   * @memberof RecipeService
   */
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

  /**
   * Get recipe by id
   *
   * @param {*} id the recipe id
   * @return {*}
   * @memberof RecipeService
   */
  getRecipe(id) {
    return this._http.get(this.url + '/' + id).pipe(
      catchError(e => {
        this.router.navigate(['/home']);
        swal('No se encuentra ninguna receta con ese id','error', 'error')
        return throwError(e);
      })
    );
  }

  /**
   * Get img for recipe
   *
   * @param {*} img the name of img
   * @return {*}
   * @memberof RecipeService
   */
  getImg(img) {
    return this._http.get(`${this.url}/uploads/img/${img}`);
  }

  /**
   * Create recipe
   *
   * @param {RecipeModel} recipe the recipe
   * @return {*}
   * @memberof RecipeService
   */
  postRecipe(recipe: RecipeModel) {
    return this._http.post(this.url, recipe);
  }

  /**
   * file new img
   *
   * @param {File} img the img
   * @param {*} idRecipe the recipe id
   * @return {*}
   * @memberof RecipeService
   */
  postRecipeImg(img: File, idRecipe) {
    let formData = new FormData();
    formData.append("file", img);
    formData.append("id", idRecipe);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });

    return this._http.request(req);
  }

  /**
   * edit recipe
   *
   * @param recipe  the recipe
   * @param id  the recipe id
   */
  putRecipe(recipe: RecipeModel, id) {
    return this._http.put(this.url + '/' + id, recipe);
  }

  /**
   * Delete recipe by id
   *
   * @param {*} id the recipe id
   * @return {*}
   * @memberof RecipeService
   */
  deleteRecipe(id) {
    return this._http.delete(this.url + '/' + id);
  }

}
