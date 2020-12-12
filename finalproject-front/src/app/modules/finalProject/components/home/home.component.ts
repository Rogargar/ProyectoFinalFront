import { FormControl } from '@angular/forms';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { SavedRecipeModel } from './../../../../models/savedRecipe/savedRecipe.model';
import { SavedRecipeService } from './../../../../services/saved-recipe.service';
import { RecipeService } from './../../../../services/recipe.service';
import { LabelModel } from './../../../../models/label/label.model';
import { LabelService } from './../../../../services/label.service';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  keyword = 'name';
  isLoading = false;
  data = [];
  datas: any;
  errorMsg: string;
  isLoadingResult: boolean;
  user: UserModel;
  labels: LabelModel;
  find = '';
  userId = '';
  savedRecipe: SavedRecipeModel;
  lastRecipes: RecipeModel[];

  constructor(private _userService: UserService, private router: Router,
    private _labelService: LabelService, private _recipeService: RecipeService,
    private _srService: SavedRecipeService) {

  }

  getUserId() {
    this.userId = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getAllRecipes();
    this.getLastRecipes();
    this.getLabels();
    if (this._userService.getToken()) {
      this.getUserId();
      this.getUser();
      this.getSavedRecipeByUser();
    } else {
      this.user = null;
    }
  }

  getAllRecipes() {
    this._recipeService.getAllRecipesPublicatedForFind().subscribe((data: any) => {
      this.data = data;
      this.isLoadingResult = true;
    });
  }

  getUser() {
    this._userService.getUserById(this.userId).subscribe((data: UserModel) => {
      this.user = data;
    });

  }

  getLabels() {
    this._labelService.getLabels().subscribe((data: LabelModel) => {
      this.labels = data;
    });
  }

  getLastRecipes() {
    this._recipeService.getLastRecipes().subscribe((data: RecipeModel[]) => {
      this.lastRecipes = data;
    });
  }

  getLabel(id) {
    this.router.navigate([id + '/label']);
  }

  getSavedRecipeByUser() {
    this._srService.getSavedRecipeByUser(this.userId).subscribe((data: SavedRecipeModel) => {
      this.savedRecipe = data;
    });

  }

  findRecipeS(id) {
    this.router.navigate([id + '/recipe']);
  }

  addRecipe() {
    this.router.navigate(['/add']);
  }

  searchCleared() {
    this.data = [];
  }

  selectEvent(item) {
    this.findRecipeS(item.id);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

}
