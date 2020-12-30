import { SavedRecipeModel } from './../../../../models/savedRecipe/savedRecipe.model';
import { UserService } from './../../../../services/user.service';
import { SavedRecipeService } from './../../../../services/saved-recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { Component, OnInit } from '@angular/core';

/**
 * Page of all recipes or all save Recipes
 *
 * @export
 * @class RecipesComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: RecipeModel[];
  recipesSave: SavedRecipeModel[];
  isSave;
  pageActual: number = 1;

  /**
   * Creates an instance of RecipesComponent.
   * @param {RecipeService} _recipesService
   * @param {SavedRecipeService} _saveRecipeService
   * @param {UserService} _userService
   * @param {Router} router
   * @param {ActivatedRoute} routerN
   * @memberof RecipesComponent
   */
  constructor(private _recipesService: RecipeService, private _saveRecipeService: SavedRecipeService, private _userService: UserService,
    private router: Router, private routerN: ActivatedRoute) {
    this.isSave = this.routerN.snapshot.paramMap.get('id');
    this.findSaveRecipes();
    this.getAllRecipes();

  }

  ngOnInit(): void {
  }

  /**
   * Get all recipes publicated
   *
   * @memberof RecipesComponent
   */
  getAllRecipes() {
    this._recipesService.getAllRecipesPublicated().subscribe((data: RecipeModel[]) => {
      this.recipes = data;
    });
  }

  /**
   * Go to page one recipe page by id
   *
   * @param {*} id
   * @memberof RecipesComponent
   */
  findRecipe(id) {
    this.router.navigate([id + '/recipe']);
  }

  /**
   * Get all save recipes by user
   *
   * @memberof RecipesComponent
   */
  findSaveRecipes() {
    this._saveRecipeService.getSavedRecipeByUser(this._userService.getToken()).subscribe((data: SavedRecipeModel[]) => {
      this.recipesSave = data;
    });
  }


}
