import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  idOwner;
  isCreator = false;
  owner: UserModel;
  recipes: RecipeModel;

  constructor(private router: ActivatedRoute, private _userService: UserService,
    private _recipeService: RecipeService, private routerN: Router) {
    this.idOwner = this.router.snapshot.paramMap.get('id');
    const creator = this.router.snapshot.paramMap.get('creator');
    this.getOwner();
    this.getRecipesByOwner();
    if (creator != null) {
      this.isCreator = true;
    }
  }

  ngOnInit(): void {
  }

  getOwner() {
    this._userService.getUserById(this.idOwner).subscribe((data: UserModel) => {
      this.owner = data;
    });
  }



  getRecipesByOwner() {
    this._recipeService.getRecipeByOwner(this.idOwner).subscribe((data: RecipeModel) => {
      this.recipes = data;
    });
  }

  findRecipe(id) {
    this.routerN.navigate([id + '/recipe']);
  }

  editRecipe(id) {
    console.log(id);
    this.routerN.navigate(['/edit/' + id]);
  }

  removeRecipe(id) {
    console.log(id);
    this._recipeService.deleteRecipe(id).subscribe(data => {
      console.log(data);
      this.getRecipesByOwner();
    })
  }

  addRecipe() {
    this.routerN.navigate(['/add']);
  }


}
