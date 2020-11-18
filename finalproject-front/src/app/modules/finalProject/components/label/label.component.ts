import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { LabelModel } from './../../../../models/label/label.model';
import { LabelService } from './../../../../services/label.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../../../../services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  id;
  label: LabelModel;
  recipes: RecipeModel;

  constructor(private _recipeService: RecipeService, private router: ActivatedRoute, private routerN: Router,
    private _labelService: LabelService) {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getLabel(this.id);
    this.getRecipesByLabel(this.id);

  }

  ngOnInit(): void {
  }

  getLabel(id) {
    this._labelService.getLabelById(id).subscribe((data: LabelModel) => {
      this.label = data;
    })
  }

  getRecipesByLabel(id) {
    this._recipeService.getRecipeByLabel(id).subscribe((data: RecipeModel) => {
      this.recipes = data;
    });
  }

  findRecipe(id) {
    this.routerN.navigate([id + '/recipe']);
  }

}
