import { CustomValidators } from './CustomValidators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/**
 * Page of register user
 *
 * @export
 * @class RegisterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  formGroup;
  roles = [];
  hide = true;
  hide2 = true;
  emails = [];

  /**
   * Creates an instance of RegisterComponent.
   * @param {UserService} _userService
   * @param {Router} router
   * @param {FormBuilder} formBuilder
   * @memberof RegisterComponent
   */
  constructor(private _userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._userService.deleteToken();
    this.getRoles();
    this.newFomGroup();
    this.getAllUser();
  }

/**
 * Get all user for check the email and don´t repeat this
 *
 * @memberof RegisterComponent
 */
getAllUser(){
  let emailss = [];
  this._userService.getUsers().subscribe((data: UserModel[]) => {
    data.forEach(datas => {
      emailss.push(datas.email);
    })
    this.emails = emailss;
  })
}

  /**
   * Create form for register user
   *
   * @memberof RegisterComponent
   */
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

  /**
   * Get all roles for select of register
   *
   * @memberof RegisterComponent
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
   * Register new user if all fields are true
   *
   * @memberof RegisterComponent
   */
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

  /**
   * Go to page of login
   *
   * @memberof RegisterComponent
   */
  login() {
    this.router.navigate(['']);
  }

}
