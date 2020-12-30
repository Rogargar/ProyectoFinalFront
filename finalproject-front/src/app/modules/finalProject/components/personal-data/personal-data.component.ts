import swal from 'sweetalert';
import { HttpEventType } from '@angular/common/http';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/**
 * Page of personal data of user
 *
 * @export
 * @class PersonalDataComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  idUser;
  user: UserModel;
  users: UserModel[];
  isEdit = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  formGroup;
  roles = [];
  edited = false;
  private imgSeleccionada: File;
  progreso = 0;

  /**
   * Creates an instance of PersonalDataComponent.
   * @param {UserService} _userService
   * @param {FormBuilder} formBuilder
   * @memberof PersonalDataComponent
   */
  constructor(private _userService: UserService, private formBuilder: FormBuilder) {
    this.getRoles();
    this.getIdUser();
    this.getUser();
  }

  ngOnInit(): void {
  }

  /**
   * Get all roles for user
   *
   * @memberof PersonalDataComponent
   */
  getRoles() {
    this._userService.getRoles().subscribe((data: any[]) => {
      data.forEach(element => {
        if (element.id !== '1') {
          this.roles.push(element);
        }
      });
    });
  }

  /**
   * Get id user for token
   *
   * @memberof PersonalDataComponent
   */
  getIdUser() {
    this.edited = false;
    this.idUser = this._userService.getToken();
  }

  /**
   * Get user by id of token
   *
   * @memberof PersonalDataComponent
   */
  getUser() {
    this._userService.getUserById(this.idUser).subscribe((data: UserModel) => {
      if (data.roles[0].id === '1') {
        this._userService.getUsers().subscribe((datas: UserModel[]) => {
          this.users = datas;
        });
      } else {
        this.user = data;
      }

    });
  }

  /**
   * edit user
   *
   * @param {*} id the user id
   * @memberof PersonalDataComponent
   */
  editUser(id) {
    this.isEdit = true;
    this.newFomGroup();
  }

  /**
   * Create form for edit personal data
   *
   * @memberof PersonalDataComponent
   */
  newFomGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.user.name, [Validators.required]),
      surname: new FormControl(this.user.surnames, [Validators.required]),
      rolUser: new FormControl(this.user.roles[0].id, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.email,
        Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
        Validators.required]),
      img: new FormControl(this.user.img)
    }
    );
  }

  /**
   *Add or edit img for user
   *
   * @memberof PersonalDataComponent
   */
  addOrEditImg() {
    if (!this.imgSeleccionada) {
      swal('Error Upload: ', `Debe seleccionar una foto`, 'error');
    } else {
      this._userService.postUserImg(this.imgSeleccionada, this.user.id).subscribe(data => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((data.loaded / data.total) * 100);
        } else if (data.type === HttpEventType.Response) {
          let response: any = data.body;
          swal('La foto se ha subido correctamente!', `La foto se ha subido con éxito`, 'success');
          this.getUser();
          this.progreso = 0;
          this.imgSeleccionada = null;
          this.newFomGroup();
          this.cancelChange();
        }
      });
    }
  }

  /**
   * Select img for user
   *
   * @param {*} event
   * @memberof PersonalDataComponent
   */
  selectImg(event) {
    this.imgSeleccionada = event.target.files[0];
    this.progreso = 0;
    if (this.imgSeleccionada.type.indexOf('image') < 0) {
      swal('Error selecinar imagen: ', ' El archivo tiene que ser del tipo imagen', 'error');
      this.imgSeleccionada = null;
    }
  }

  /**
   *Save change personal data for user
   *
   * @memberof PersonalDataComponent
   */
  saveChange() {
    this.user.roles = [];
    this._userService.getRole(this.formGroup.value.rolUser).subscribe((data: any) => {
      this.user.roles.push(data);
      this._userService.putUser(this.user.id, this.user).subscribe(data => {
        swal('Cambios realizados correctamente!', `Los cambios se han realizado con éxito`, 'success');
        this.cancelChange();
      });
    });
  }

  /**
   * Cancel change of personal data for user
   *
   * @memberof PersonalDataComponent
   */
  cancelChange() {
    this.edited = true;
    this.roles = [];
    this.isEdit = false;
    this.getRoles();
    this.getIdUser();
    this.getUser();
  }

}
