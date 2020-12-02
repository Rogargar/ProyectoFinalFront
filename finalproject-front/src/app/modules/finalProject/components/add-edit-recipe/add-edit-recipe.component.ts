import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { UserService } from './../../../../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LabelService } from './../../../../services/label.service';
import { LabelModel } from './../../../../models/label/label.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  id;
  dificultades = ['facil', 'media', 'dificil'];
  estados = ['publicada', 'borrador'];
  etiquetas: LabelModel[];
  formGroup;
  formImg;
  newRecipe: RecipeModel;
  editOrAdd = '';
  isAdd = true;
  saved = false;
  labels = [];
  owner;
  private imgSeleccionada: File;

  constructor(private router: ActivatedRoute, private _labelService: LabelService, private _userService: UserService,
    private formBuilder: FormBuilder, private _recipeService: RecipeService) {
    this.getLabels();
    this.id = this.router.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.isAdd = false;
      this.saved = false;
      this.getRecipe();
      this.editOrAdd = 'Editar';
      this.isAdd = false;
    } else {
      //this.newFomGroup();
      this.saved = false;
      this.editOrAdd = 'Añadir';
    }
    this.getOwner();
  }

  ngOnInit(): void {
  }

  getOwner() {
    this._userService.getUserById(this._userService.getToken()).subscribe(data => {
      this.owner = data;
      if (this.isAdd === true) {
        this.newFomGroup();
      }
    });
  }

  newFomGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      ingredients: new FormControl(null),
      preparation: new FormControl(null),
      ration: new FormControl(null),
      suggestions: new FormControl(null),
      time: new FormControl(null),
      state: new FormControl(null),
      difficulty: new FormControl(null),
      label: new FormControl(null),
      owner: new FormControl(this.owner),
    });
  }

  newFormImg() {
    this.formImg = new FormGroup({
      img: new FormControl(null, [Validators.required]),
      recipeId: new FormControl(this.newRecipe.id),
    });
  }

  getRecipe() {
    console.log(this.id);

  }

  getLabels() {
    this._labelService.getLabels().subscribe((data: LabelModel[]) => {
      this.etiquetas = data;
    });
  }

  addOrEditRecipe() {
    console.log(this.formGroup.value);
    if (this.isAdd === true) {
      this.formGroup.value.time = this.formGroup.value.time + ' min';
      this.formGroup.value.label = this.labels;
      console.log(this.formGroup.value);
      this._recipeService.postRecipe(this.formGroup.value).subscribe((data: RecipeModel) => {
        this.saved = true;
        this.newRecipe = data;
        console.log(this.newRecipe);
        this.newFormImg();
      })
    } else {

    }
  }

  addLabel() {
    console.log(this.formGroup.value.label);
    if (this.formGroup.value.label !== null) {
      this._labelService.getLabelById(this.formGroup.value.label).subscribe((data: LabelModel) => {

        if (this.labels['length'] !== 0) {
          let newLabels = [];
          let c = 0;
          this.labels.forEach(label => {
            if (label.id === data.id) {
              c++;
            } else {
              newLabels.push(data);
            }
          });
          if (c === 0) {
            this.labels.push(newLabels[0]);
          }
          console.log(this.labels);
        } else {
          this.labels.push(data);
        }
      });
    }
  }

  removeLabel(id) {
    let newLabels = [];
    this.labels.forEach(label => {
      if (label.id !== id) {
        newLabels.push(label);
      }
    });
    this.labels = [];
    this.labels = newLabels;
    console.log(this.labels);
  }

  addOrEditImg() {
    this._recipeService.postRecipeImg(this.imgSeleccionada, this.newRecipe.id).subscribe(data => {
      console.log(data);
    });
  }

  selectImg(event) {
    this.imgSeleccionada = event.target.files[0];
  }

}
