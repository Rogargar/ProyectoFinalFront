import { SavedRecipeModel } from './../../../../models/savedRecipe/savedRecipe.model';
import { SavedRecipeService } from './../../../../services/saved-recipe.service';
import { RecipeService } from './../../../../services/recipe.service';
import { LabelModel } from './../../../../models/label/label.model';
import { LabelService } from './../../../../services/label.service';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: UserModel;
  labels: LabelModel;
  find = '';
  userId = '';
  savedRecipe: SavedRecipeModel;

  constructor(private _userService: UserService, private router: Router,
    private _labelService: LabelService, private _recipeService: RecipeService,
    private _srService: SavedRecipeService) {

  }

  getUserId() {
    this.userId = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getLabels();
    if (this._userService.getToken()) {
      this.getUser();
      this.getUserId();
      this.getSavedRecipeByUser();
    } else {
      this.user = null;
    }
  }

  findWord(findss) {
    console.log(findss);
    console.log(this.find);
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

  getLabel(id) {
    console.log(id);
    this.router.navigate([ id + '/label']);
  }

  findRecipe() {
    console.log(this.find);
    let palabra = this.find;
  }

  getSavedRecipeByUser() {
    this._srService.getSavedRecipeByUser(this.userId).subscribe((data: SavedRecipeModel) => {
      this.savedRecipe = data;
      console.log(this.savedRecipe);
    });

  }

  findRecipeS(id) {
    this.router.navigate([ id + '/recipe']);
  }

}
