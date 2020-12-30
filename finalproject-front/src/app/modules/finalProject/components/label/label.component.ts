import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { LabelModel } from './../../../../models/label/label.model';
import { LabelService } from './../../../../services/label.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../../../../services/recipe.service';
import { Component, OnInit } from '@angular/core';

/**
 * Page of recipes by label id
 *
 * @export
 * @class LabelComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  id;
  label: LabelModel;
  recipes: RecipeModel[];
  pageActual: number = 1;

  /**
   * Creates an instance of LabelComponent.
   * @param {RecipeService} _recipeService
   * @param {ActivatedRoute} router
   * @param {Router} routerN
   * @param {LabelService} _labelService
   * @memberof LabelComponent
   */
  constructor(private _recipeService: RecipeService, private router: ActivatedRoute, private routerN: Router,
    private _labelService: LabelService) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getLabel(this.id);
    this.getRecipesByLabel(this.id);

  }

  ngOnInit(): void {
  }

  /**
   * Ge label by id
   *
   * @param {*} id
   * @memberof LabelComponent
   */
  getLabel(id) {
    this._labelService.getLabelById(id).subscribe(
      (data: LabelModel) => {
        this.label = data;
      }, (error) => {
      if (error.status === 404) {
      }
    });
  }

  /**
   * Get recipes by label id
   *
   * @param {*} id
   * @memberof LabelComponent
   */
  getRecipesByLabel(id) {
    this._recipeService.getRecipeByLabel(id).subscribe((data: RecipeModel[]) => {
      this.recipes = data;
    }, (error) => {
      if (error.status === 404) {
      }
    });
  }

  /**
   *Go to one recipe by id
   *
   * @param {*} id the recipe id
   * @memberof LabelComponent
   */
  findRecipe(id) {
    this.routerN.navigate([id + '/recipe']);
  }

}
