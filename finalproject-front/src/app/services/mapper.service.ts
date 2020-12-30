import { SavedRecipeModel } from './../models/savedRecipe/savedRecipe.model';
import { RecipeModel } from './../models/recipe/recipe.model';
import { LabelModel } from './../models/label/label.model';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user/user.model';

/**
 * Mapper service for mapper data of model
 *
 * @export
 * @class MapperService
 */
@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  /**
   * Mapper user
   *
   * @param {*} item the user
   * @return {*}  {UserModel}
   * @memberof MapperService
   */
  mapUsers(item: any): UserModel {
    return item ? new UserModel({
      id: item.id,
      email: item.email,
      name: item.name,
      pass: item.pass,
      roles: item.roles,
      surnames: item.surnames,
      img: item.img,
    }) : null;
  }

  /**
   * Mapper label
   *
   * @param {*} item the label
   * @return {*}  {LabelModel}
   * @memberof MapperService
   */
  mapLabel(item: any): LabelModel {
    return item ? new LabelModel({
      id: item.id,
      name: item.name,
    }) : null;

  }

  /**
   * Mapper recipe
   *
   * @param {*} item the recipe
   * @return {*}  {RecipeModel}
   * @memberof MapperService
   */
  mapRecipes(item: any): RecipeModel {
    return item ? new RecipeModel({
      id: item.id,
      name: item.name,
      difficulty: item.difficulty,
      img: item.img,
      ingredients: item.ingredients,
      preparation: item.preparation,
      ration: item.ration,
      suggestions: item.suggestions,
      owner: this.mapUsers(item.owner),
      time: item.time,
      state: item.state,
      publicationDate: item.publicationDate,
      label:item.label,
    }) : null;
  }

  /**
   * Mapper save recipe
   *
   * @param {*} item the save recipe
   * @return {*}  {SavedRecipeModel}
   * @memberof MapperService
   */
  mapSavedRecipe(item: any): SavedRecipeModel {
    return item ? new SavedRecipeModel({
      id: item.id,
      name: item.name,
      user: this.mapUsers(item.user),
      recipes: this.mapRecipes(item.recipes),
    }) : null;
  }

}
