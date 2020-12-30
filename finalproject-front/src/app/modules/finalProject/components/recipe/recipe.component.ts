import swal from 'sweetalert';
import { UserModel } from './../../../../models/user/user.model';
import { SavedRecipeModel } from './../../../../models/savedRecipe/savedRecipe.model';
import { UserService } from './../../../../services/user.service';
import { SavedRecipeService } from './../../../../services/saved-recipe.service';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/**
 * Page of recipe by id
 *
 * @export
 * @class RecipeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  isSaved = false;
  recipeSave: SavedRecipeModel;
  recipeForSave: SavedRecipeModel;
  id;
  recipe: RecipeModel;

  /**
   * Creates an instance of RecipeComponent.
   * @param {RecipeService} _recipeService
   * @param {Router} routerN
   * @param {ActivatedRoute} router
   * @param {UserService} _userService
   * @param {SavedRecipeService} _savedRecipeService
   * @memberof RecipeComponent
   */
  constructor(private _recipeService: RecipeService, private routerN: Router,
    private router: ActivatedRoute, private _userService: UserService,
    private _savedRecipeService: SavedRecipeService) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getRecipe(this.id);
    this.isSavedRecipe(this._userService.getToken(), this.id);
  }

  ngOnInit(): void {
  }

  /**
   * Get recipe by id
   *
   * @param {*} id
   * @memberof RecipeComponent
   */
  getRecipe(id) {
    this._recipeService.getRecipe(id).subscribe((data: RecipeModel) => {
      this.recipe = data;
      let sr = new SavedRecipeModel();
      sr.recipes = this.recipe;
      this._userService.getUserById(this._userService.getToken()).subscribe((data: UserModel) => {
        sr.user = data;
        this.recipeForSave = sr;
      });
    }, (error) => {
      if (error.status === 404) {
      }
    });
  }

  /**
   * Go to router for edit recipe if user is owner
   *
   * @param {*} id the recipe id
   * @memberof RecipeComponent
   */
  editRecipe(id) {
    this.routerN.navigate(['/edit/' + id]);
  }

  /**
   * Save recipe for user if this don´t owner
   *
   * @param {*} idUser the user id
   * @param {*} idRecipe the recipe id
   * @memberof RecipeComponent
   */
  isSavedRecipe(idUser, idRecipe) {
    this._savedRecipeService.getSavedRecipeByUserAndRecipe(idUser, idRecipe).subscribe((data: SavedRecipeModel) => {
      if (data.recipes !== null) {
        this.isSaved = true;
        this.recipeSave = data;
      }
    }, (error) => {
      if (error.status === 404) {
      }
    }
    );
  }

  /**
   * Delete recipe of save
   *
   * @param {*} idSaveRecipe
   * @memberof RecipeComponent
   */
  deleteSaveRecipe(idSaveRecipe) {
    this._savedRecipeService.deleteSavedRecipe(idSaveRecipe).subscribe(data => {
      this.getRecipe(this.id);
      this.isSaved = false;
      swal('La receta se ha eliminado de favoritos correctamente!', 'ok', 'success');
    });
  }

  /**
   * Save recipe
   *
   * @memberof RecipeComponent
   */
  saveRecipe() {
    this._savedRecipeService.saveSavedRecipe(this.recipeForSave).subscribe(data => {
      this.isSaved = true;
      swal('La receta se ha añadido a favoritos correctamente!', 'ok', 'success');
      this.getRecipe(this.id);
      this.isSavedRecipe(this._userService.getToken(), this.id);
    });

  }

  /**
   * Go to page of all recipes for owner
   *
   * @param {*} idUser
   * @memberof RecipeComponent
   */
  serchRecipeOwner(idUser) {
    this.routerN.navigate([idUser + '/user']);

  }

  /**
   * Go to page of label by id
   *
   * @param {*} id
   * @memberof RecipeComponent
   */
  getLabel(id) {
    this.routerN.navigate([id + '/label']);
  }

}
