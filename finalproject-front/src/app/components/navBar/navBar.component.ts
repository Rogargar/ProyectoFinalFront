import { UserModel } from './../../models/user/user.model';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { faCoffee, faUser, faUserEdit, faUserCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss']
})
export class NavBarComponent implements OnInit {

  faCoffee = faCoffee;
  faUser = faUser;
  faUserEdit = faUserEdit;
  faUserCog = faUserCog;
  user = null;
  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
    if (this._userService.getToken()) {
      this.getUser();
    } else {
      this.user = null;
    }
  }

  help() {
    this.router.navigate(['/help']);
  }
  home() {
    this.router.navigate(['/home']);
  }

  recetas() {
    this.router.navigate(['/recipes']);
  }

  close() {
    this._userService.deleteToken();
    this.router.navigate(['']);
  }
  register() {
    this._userService.deleteToken();
    this.router.navigate(['/register']);
  }

  getUser() {
    this._userService.getUserById(this._userService.getToken()).subscribe((data: UserModel) => {
      this.user = data;
    });

  }

}
