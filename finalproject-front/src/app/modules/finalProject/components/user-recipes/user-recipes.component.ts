import swal from 'sweetalert';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

/**
 * Page of recipes of user or table for edit or delete recipes
 *
 * @export
 * @class UserRecipesComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  idOwner;
  isCreator = false;
  owner: UserModel;
  recipes: RecipeModel[];
  pageActual: number = 1;

  /**
   * Creates an instance of UserRecipesComponent.
   * @param {ActivatedRoute} router
   * @param {UserService} _userService
   * @param {RecipeService} _recipeService
   * @param {Router} routerN
   * @memberof UserRecipesComponent
   */
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

  /**
   * Get owner of recipes
   *
   * @memberof UserRecipesComponent
   */
  getOwner() {
    this._userService.getUserById(this.idOwner).subscribe((data: UserModel) => {
      this.owner = data;
    });
  }

  /**
   * Get all recipes of owner
   *
   * @memberof UserRecipesComponent
   */
  getRecipesByOwner() {
    this._recipeService.getRecipeByOwner(this.idOwner).subscribe((data: RecipeModel[]) => {
      this.recipes = data;
    });
  }

  /**
   * Go to page of recipe by id
   *
   * @param {*} id the recipe id
   * @memberof UserRecipesComponent
   */
  findRecipe(id) {
    this.routerN.navigate([id + '/recipe']);
  }

  /**
   * Go to page of edit recipe bby id
   *
   * @param {*} id the recipe id
   * @memberof UserRecipesComponent
   */
  editRecipe(id) {
    this.routerN.navigate(['/edit/' + id]);
  }

  /**
   * Delete recipe by id
   *
   * @param {*} id the recipe id
   * @memberof UserRecipesComponent
   */
  removeRecipe(id) {
    Swal.fire({
      title: '¿Deseas eliminar esta receta?',
      text: "Los cambios no se podran revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._recipeService.deleteRecipe(id).subscribe(data => {
          Swal.fire(
            'Eliminado correctamente!',
            'La receta a sido eliminada con exito',
            'success'
          )
          this.getRecipesByOwner();
        })
      }
    })

  }

  /**
   * Go to page for add new recipe
   *
   * @memberof UserRecipesComponent
   */
  addRecipe() {
    this.routerN.navigate(['/add']);
  }

  /**
   * Go to page for edit img of recipe
   *
   * @param {*} id the recipe id
   * @memberof UserRecipesComponent
   */
  editImagen(id) {
    this.routerN.navigate(['/editImg/' + id]);
  }

  /**
   * Publicated recipe by id , if state is 'borrador'
   *
   * @param {*} id the recipe id
   * @memberof UserRecipesComponent
   */
  publicatedRecipe(id) {
    this._recipeService.getRecipe(id).subscribe((data: RecipeModel) => {
      let recipe = new RecipeModel();
      recipe = data;
      recipe.state = 'Publicada';
      this._recipeService.putRecipe(recipe, id).subscribe(datas => {
        swal('La receta se ha publicado correctamente!', `La receta ${data.name} se ha editado con éxito`, 'success');
        this.getRecipesByOwner();
      });
    });
  }

}
