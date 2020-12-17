import { Md5 } from 'angular-md5';
import { CustomValidators } from './../register/CustomValidators';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as CryptoJS from 'crypto-js';

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
  hide = true;
  hide2 = true;

  constructor(private _userService: UserService, private formBuilder: FormBuilder) {
    this.getIdUser();
    this.getUser();
    this.getRoles();
  }

  ngOnInit(): void {
  }

  getRoles() {
    this._userService.getRoles().subscribe((data: any[]) => {
      data.forEach(element => {
        if (element.id !== '1') {
          this.roles.push(element);
        }
      });
    });
  }

  getIdUser() {
    this.idUser = this._userService.getToken();
  }

  getUser() {
    this._userService.getUserById(this.idUser).subscribe((data: UserModel) => {
      if (data.roles[0].id === '1') {
        this._userService.getUsers().subscribe((datas: UserModel[]) => {
          this.users = datas;
        });
      } else {
        this.user = data;
        //console.log(CryptoJS.AES.decrypt(this.user.pass.trim()).toString());
      }

    });
  }

  editUser(id) {
    this.isEdit = true;
    this.newFomGroup();
  }

  newFomGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.user.name, [Validators.required]),
      surname: new FormControl(this.user.surnames, [Validators.required]),
      rolUser: new FormControl(this.user.roles[0].id, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.email,
        Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
        Validators.required]),
      password: new FormControl(this.user.pass, [
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }), Validators.minLength(8)],
      ),
      confirmPassword: new FormControl(this.user.pass, Validators.compose([Validators.required])),
    }
    );
  }

}
