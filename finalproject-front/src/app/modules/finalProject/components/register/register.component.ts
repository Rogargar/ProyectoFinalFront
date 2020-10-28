import { Router } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { UserModel } from './../../../../models/user/user.model';
import { UserComponent } from './../user/user.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  surname: string;
  rolUser: string;//Mejora que salga una opcion por defecto
  email: string;
  password: string;
  confirmPassword: string;
  passwordError: boolean;
  roles = ['creador', 'user'];

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this._userService.deleteToken();
  }

  register() {
    let user = new UserModel();
    if (this.password === this.confirmPassword) {
      user.email = this.email;
      user.rol = this.rolUser;
      user.name = this.name;
      user.surnames = this.surname;
      user.pass = this.password;
      console.log(user);
      this._userService.registerUser(user).subscribe(data => {
        this._userService.getUserByEmail(this.email).subscribe(data => {
          console.log(data);
          this._userService.setToken(data['id']);
          this.router.navigate(['/home']);
        })
      });
    }
  }

  login() {
    this.router.navigate(['']);
  }

}
