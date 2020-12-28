import { SavedRecipeModel } from './../../../../models/savedRecipe/savedRecipe.model';
import { UserService } from './../../../../services/user.service';
import { SavedRecipeService } from './../../../../services/saved-recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private _recipesService: RecipeService, private _saveRecipeService: SavedRecipeService, private _userService: UserService,
    private router: Router, private routerN: ActivatedRoute) {
    this.isSave = this.routerN.snapshot.paramMap.get('id');
    this.findSaveRecipes();
    this.getAllRecipes();

  }

  ngOnInit(): void {
  }

  getAllRecipes() {
    this._recipesService.getAllRecipesPublicated().subscribe((data: RecipeModel[]) => {
      this.recipes = data;
    });
  }

  findRecipe(id) {
    this.router.navigate([id + '/recipe']);
  }

  findSaveRecipes() {
    this._saveRecipeService.getSavedRecipeByUser(this._userService.getToken()).subscribe((data: SavedRecipeModel[]) => {
      this.recipesSave = data;
    });
  }


}
