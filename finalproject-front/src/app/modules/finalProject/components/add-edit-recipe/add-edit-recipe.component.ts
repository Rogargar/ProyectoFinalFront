import { RecipeModel } from './../../../../models/recipe/recipe.model';
import { RecipeService } from './../../../../services/recipe.service';
import { UserService } from './../../../../services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LabelService } from './../../../../services/label.service';
import { LabelModel } from './../../../../models/label/label.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  id;
  idRecipeImg;
  dificultades = ['Fácil', 'Media', 'Dificil'];
  estados = ['Publicada', 'Borrador'];
  etiquetas: LabelModel[];
  formGroup;
  formImg;
  newRecipe: RecipeModel;
  editRecipe: RecipeModel;
  editOrAdd = '';
  isAdd = true;
  saved = false;
  labels = [];
  owner;
  private imgSeleccionada: File;
  textRecipe = ClassicEditor;
  textIngred = ClassicEditor;
  textSugg = ClassicEditor;
  progreso = 0;

  constructor(private router: ActivatedRoute, private _labelService: LabelService, private _userService: UserService,
    private formBuilder: FormBuilder, private _recipeService: RecipeService, private routerN: Router) {
    this.getLabels();
    this.id = this.router.snapshot.paramMap.get('id');
    this.idRecipeImg = this.router.snapshot.paramMap.get('idRecipeImg');
    if (this.id !== null) {
      this.isAdd = false;
      this.saved = false;
      this.getRecipe();
      this.editOrAdd = 'Editar';
    } else if (this.idRecipeImg !== null) {
      this.editOrAdd = 'Editar';
      this._recipeService.getRecipe(this.idRecipeImg).subscribe((data: RecipeModel) => {
        this.editRecipe = data;
        this.newRecipe = data;
        this.newFomGroupEdit();
        this.saved = true;
      });
    } else {
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
      ingredients: new FormControl(null,[Validators.required]),
      preparation: new FormControl(null,[Validators.required]),
      ration: new FormControl(null,[Validators.required]),
      suggestions: new FormControl(null),
      time: new FormControl(null,[Validators.required]),
      state: new FormControl(null,[Validators.required]),
      difficulty: new FormControl(null,[Validators.required]),
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
  newFormImgEdit() {
    this.formImg = new FormGroup({
      img: new FormControl(this.editRecipe.img, [Validators.required]),
      recipeId: new FormControl(this.editRecipe.id),
    });
  }

  newFomGroupEdit() {
    this.labels = this.editRecipe.label;
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.editRecipe.name, [Validators.required]),
      ingredients: new FormControl(this.editRecipe.ingredients,[Validators.required]),
      preparation: new FormControl(this.editRecipe.preparation,[Validators.required]),
      ration: new FormControl(this.editRecipe.ration,[Validators.required]),
      suggestions: new FormControl(this.editRecipe.suggestions),
      time: new FormControl(this.editRecipe.time.split(' ')[0],[Validators.required]),
      state: new FormControl(this.editRecipe.state,[Validators.required]),
      difficulty: new FormControl(this.editRecipe.difficulty,[Validators.required]),
      label: new FormControl(null),
      img: new FormControl(this.editRecipe.img),
      owner: new FormControl(this.owner),
    });
  }

  getRecipe() {
    this._recipeService.getRecipe(this.id).subscribe((data: RecipeModel) => {
      this.editRecipe = data;
      this.newFomGroupEdit();
    });

  }

  getLabels() {
    this._labelService.getLabels().subscribe((data: LabelModel[]) => {
      this.etiquetas = data;
    });
  }

  addOrEditRecipe() {
    if (this.isAdd === true) {
      this.formGroup.value.time = this.formGroup.value.time + ' min';
      this.formGroup.value.label = this.labels;
      this._recipeService.postRecipe(this.formGroup.value).subscribe((data: RecipeModel) => {
        swal('La receta se ha creado correctamente!', `La receta ${data.name} se ha creado con éxito`, 'success');
        this.saved = true;
        this.newRecipe = data;
        this.newFormImg();
      });
    } else {
      this.formGroup.value.time = this.formGroup.value.time + ' min';
      this.formGroup.value.label = this.labels;
      this.formGroup.value.img = this.editRecipe.img;
      this._recipeService.putRecipe(this.formGroup.value, this.editRecipe.id).subscribe((data: RecipeModel) => {
        swal('La receta se ha editado correctamente!', `La receta ${data.name} se ha editado con éxito`, 'success');
        this.routerN.navigate([this.owner.id + '/user/1']);
      });
    }
  }

  addLabel() {
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
  }

  addOrEditImg() {
    if (!this.imgSeleccionada) {
      swal('Error Upload: ', `Debe seleccionar una foto`, 'error');
    } else {
      this._recipeService.postRecipeImg(this.imgSeleccionada, this.newRecipe.id).subscribe(data => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((data.loaded / data.total) * 100);
        } else if (data.type === HttpEventType.Response) {
          let response: any = data.body;
          swal('La foto se ha subido correctamente!', `La foto se ha subido con éxito`, 'success');
          this.routerN.navigate([this.owner.id + '/user/1']);
        }
      });
    }
  }

  selectImg(event) {
    this.imgSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.imgSeleccionada.type.indexOf('image') < 0) {
      swal('Error selecinar imagen: ', ' El archivo tiene que ser del tipo imagen', 'error');
      this.imgSeleccionada = null;
    }
  }

  cancelOrEditRecipe() {
    this.routerN.navigate([this.owner.id + '/user/1']);
  }

}
