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
  find = "";

  constructor(private _userService: UserService, private router: Router,
    private _labelService: LabelService, private _recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.getLabels();
    if (this._userService.getToken()) {
      this.getUser();
    } else {
      this.user = null;
    }
  }

  findWord(findss) {
    console.log(findss);
    console.log(this.find);
  }

  getUser() {
    this._userService.getUserById(this._userService.getToken()).subscribe((data: UserModel) => {
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
    this._recipeService.getRecipeByLabel(id).subscribe(data => {
      console.log(data);
    })
  }
  findRecipe() {
    console.log(this.find);
    let palabra = this.find;
  }

}
