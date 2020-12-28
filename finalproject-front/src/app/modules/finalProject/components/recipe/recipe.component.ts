import swal from 'sweetalert';
import { UserModel } from './../../../../models/user/user.model';
import { SavedRecipeModel } from './../../../../models/savedRecipe/savedRecipe.model';
import { UserService } from './../../../../services/user.service';
import { SavedRecipeService } from './../../../../services/saved-recipe.service';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private _recipeService: RecipeService, private routerN: Router,
    private router: ActivatedRoute, private _userService: UserService,
    private _savedRecipeService: SavedRecipeService) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getRecipe(this.id);
    this.isSavedRecipe(this._userService.getToken(), this.id);
  }

  ngOnInit(): void {
  }

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

  editRecipe(id) {
    this.routerN.navigate(['/edit/' + id]);
  }

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

  deleteSaveRecipe(idSaveRecipe) {
    this._savedRecipeService.deleteSavedRecipe(idSaveRecipe).subscribe(data => {
      this.getRecipe(this.id);
      this.isSaved = false;
      swal('La receta se ha eliminado de favoritos correctamente!', 'ok', 'success');
    });
  }

  saveRecipe() {
    this._savedRecipeService.saveSavedRecipe(this.recipeForSave).subscribe(data => {
      this.isSaved = true;
      swal('La receta se ha añadido a favoritos correctamente!', 'ok', 'success');
      this.getRecipe(this.id);
      this.isSavedRecipe(this._userService.getToken(), this.id);
    });

  }

  serchRecipeOwner(idUser) {
    this.routerN.navigate([idUser + '/user']);

  }

  getLabel(id) {
    this.routerN.navigate([id + '/label']);
  }

}
