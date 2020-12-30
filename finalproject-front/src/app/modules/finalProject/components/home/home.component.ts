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

/**
 * Page of home
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
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
  labels: LabelModel[];
  find = '';
  userId = '';
  savedRecipe: SavedRecipeModel[];
  lastRecipes: RecipeModel[];

  /**
   * Creates an instance of HomeComponent.
   * @param {UserService} _userService
   * @param {Router} router
   * @param {LabelService} _labelService
   * @param {RecipeService} _recipeService
   * @param {SavedRecipeService} _srService
   * @memberof HomeComponent
   */
  constructor(private _userService: UserService, private router: Router,
    private _labelService: LabelService, private _recipeService: RecipeService,
    private _srService: SavedRecipeService) {

  }

  /**
   * Get id of user is login
   *
   * @memberof HomeComponent
   */
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

  /**
   * Get all recipes for search
   *
   * @memberof HomeComponent
   */
  getAllRecipes() {
    this._recipeService.getAllRecipesPublicatedForFind().subscribe((data: any) => {
      this.data = data;
      this.isLoadingResult = true;
    });
  }

  /**
   *  Get User is login
   */
  getUser() {
    this._userService.getUserById(this.userId).subscribe((data: UserModel) => {
      this.user = data;
    });

  }

  /**
   * Get all labels
   *
   * @memberof HomeComponent
   */
  getLabels() {
    this._labelService.getLabels().subscribe((data: LabelModel[]) => {
      this.labels = data;
    });
  }

  /**
   * Get Last recipes
   *
   * @memberof HomeComponent
   */
  getLastRecipes() {
    this._recipeService.getLastRecipes().subscribe((data: RecipeModel[]) => {
      this.lastRecipes = data;
    });
  }

  /**
   * Go to router label with id of label
   *
   * @param {*} id the label id
   * @memberof HomeComponent
   */
  getLabel(id) {
    this.router.navigate([id + '/label']);
  }

  /**
   * Get Saved recipes by user
   *
   * @memberof HomeComponent
   */
  getSavedRecipeByUser() {
    this._srService.getSavedRecipeByUser(this.userId).subscribe((data: SavedRecipeModel[]) => {
      this.savedRecipe = data;
    });

  }

  /**
   * find recipes by id
   *
   * @param {*} id
   * @memberof HomeComponent
   */
  findRecipeS(id) {
    this.router.navigate([id + '/recipe']);
  }

  /**
   * Go to router for add recipe if user login is creater user
   *
   * @memberof HomeComponent
   */
  addRecipe() {
    this.router.navigate(['/add']);
  }

  /**
   * Clear filter of search recipe
   *
   * @memberof HomeComponent
   */
  searchCleared() {
    this.data = [];
  }

  /**
   * Select recipe for search
   *
   * @param {*} item the recipe for searh
   * @memberof HomeComponent
   */
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
