import { Router } from '@angular/router';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: RecipeModel;

  constructor(private _recipesService: RecipeService, private router: Router) {
    this.getAllRecipes();
  }

  ngOnInit(): void {
  }

  getAllRecipes() {
    this._recipesService.getAllRecipes().subscribe((data: RecipeModel) => {
      console.log(data);
      this.recipes = data;
    });
  }

  findRecipe(id) {
    console.log(id);
    this.router.navigate([ id + '/recipe']);
  }


}
