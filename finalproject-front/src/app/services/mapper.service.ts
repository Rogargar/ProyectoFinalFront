import { RolModel } from './../models/rol/rol.model';
import { SavedRecipeModel } from './../models/savedRecipe/savedRecipe.model';
import { RecipeModel } from './../models/recipe/recipe.model';
import { LabelModel } from './../models/label/label.model';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapUsers(item: any): UserModel {
    return item ? new UserModel({
      id: item.id,
      email: item.email,
      name: item.name,
      pass: item.pass,
      rol: item.rol,
      surnames: item.surnames,
    }) : null;
  }

  mapLabel(item: any): LabelModel {
    return item ? new LabelModel({
      id: item.id,
      name: item.name,
    }) : null;

  }

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
      label: this.mapLabel(item.label),
    }) : null;
  }

  mapSavedRecipe(item: any): SavedRecipeModel {
    return item ? new SavedRecipeModel({
      id: item.id,
      name: item.name,
      user: this.mapUsers(item.user),
      recipes: this.mapRecipes(item.recipes),
    }) : null;
  }

}
