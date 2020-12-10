import { CustomValidators } from './CustomValidators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  formGroup;
  /*name: string;
  surname: string;
  rolUser: string;//Mejora que salga una opcion por defecto
  email: string;
  password: null;
  confirmPassword: string;
  passwordError: boolean;
  roles = [];*/
  roles = [];
  hide = true;
  hide2 = true;

  constructor(private _userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._userService.deleteToken();
    this.getRoles();
    this.newFomGroup();
  }

  newFomGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      rolUser: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        // tslint:disable-next-line: max-line-length
        Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
        Validators.required]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }), Validators.minLength(8)],
      ),
      confirmPassword: new FormControl('', Validators.compose([Validators.required])),
    }
    );
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

  register() {
    let user = new UserModel();
    if (this.formGroup.value['password'] === this.formGroup.value['confirmPassword']) {
      user.name = this.formGroup.value['name'];
      user.email = this.formGroup.value['email'];
      user.surnames = this.formGroup.value['surname'];
      user.pass = this.formGroup.value['password'];
      this._userService.getRole(this.formGroup.value['rolUser']).subscribe((data: any) => {
        user.roles.push(data);
        this._userService.registerUser(user).subscribe(data => {
          this._userService.getUserByEmail(this.formGroup.value['email']).subscribe(data => {
            this._userService.setToken(data['id']);
            this.router.navigate(['/home']);
          });
        });
      });
    }
  }

  login() {
    this.router.navigate(['']);
  }

}
