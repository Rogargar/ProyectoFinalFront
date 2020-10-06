import { Md5 } from 'angular-md5';
import * as CryptoJS from 'crypto-js';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  esError = false;
  form: FormGroup;
  error: string;

  constructor(private _userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      pass: new FormControl(null, [Validators.required]),
    });
  }

  recogerDatos() {
    let user = new UserModel();
    console.log(user);
    console.log(this.form.value.pass);
    const pass = CryptoJS.MD5(this.form.value.pass).toString();
    this.form.value.pass = pass;
    user = this.form.value;
    if (user.email !== null) {
      console.log(user);
      this._userService.validatorEmailAndPass(user)
        .subscribe(data => {
          switch (data) {
            case -1:
              this.esError = true;
              this.error = 'Email incorecto';
              break;
            case -2:
              this.esError = true;
              this.error = 'Contraseña incorecto';
              break;
            case 1:
              this.esError = false;
              //this.router.navigateByUrl('<pathDefinedInRouteConfig>');
              break;
          }
        });
    }
  }

}
