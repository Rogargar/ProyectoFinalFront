import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';

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
  roles = [];

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this._userService.deleteToken();
    this.getRoles();
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
    if (this.password === this.confirmPassword) {
      user.email = this.email;
      user.name = this.name;
      user.surnames = this.surname;
      user.pass = this.password;
      this._userService.getRole(this.rolUser).subscribe((data: any) => {
        user.rol.push(data);
        this._userService.registerUser(user).subscribe(data => {
          this._userService.getUserByEmail(this.email).subscribe(data => {
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
