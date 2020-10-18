import { Md5 } from 'angular-md5';
import * as CryptoJS from 'crypto-js';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


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
    this._userService.deleteToken();
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
    const pass = CryptoJS.MD5(this.form.value.pass).toString();
    this.form.value.pass = pass;
    user = this.form.value;
    if (user.email !== null) {
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
              this._userService.getUserByEmail(this.form.value.email).subscribe(data => {
                console.log(data);
                this._userService.setToken(data['id']);
                this.router.navigate(['/home']);
              })
              break;
          }
        });
    }
  }
  register() {
    this.router.navigate(['/register']);
  }

}
