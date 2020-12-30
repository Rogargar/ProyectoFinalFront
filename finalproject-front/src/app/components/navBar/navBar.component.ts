import { UserModel } from './../../models/user/user.model';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { faCoffee, faUser, faUserEdit, faUserCog } from '@fortawesome/free-solid-svg-icons';
/**
 * NavBar for navegation for this aplication
 *
 * @export
 * @class NavBarComponent
 * @implements {OnInit}
 */
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

  /**
   *Get user for token
   *
   * @memberof NavBarComponent
   */
  ngOnInit() {
    if (this._userService.getToken()) {
      this.getUser();
    } else {
      this.user = null;
    }
  }

  /**
   * Go to router /help
   *
   * @memberof NavBarComponent
   */
  help() {
    this.router.navigate(['/help']);
  }

  /**
   * Go to router /home
   *
   * @memberof NavBarComponent
   */
  home() {
    this.router.navigate(['/home']);
  }

  /**
   * Go to router /recipes
   *
   * @memberof NavBarComponent
   */
  recetas() {
    this.router.navigate(['/recipes']);
  }

  /**
   * Go to router recipes of user
   *
   * @memberof NavBarComponent
   */
  misRecetas() {
    this.router.navigate([this._userService.getToken() + '/user/1']);
  }

  /**
   * Go to login and delete token
   *
   * @memberof NavBarComponent
   */
  close() {
    this._userService.deleteToken();
    this.router.navigate(['']);
  }

  /**
   *Go to register
   *
   * @memberof NavBarComponent
   */
  register() {
    this._userService.deleteToken();
    this.router.navigate(['/register']);
  }

  /**
   * Get user that navigate for aplication
   *
   * @memberof NavBarComponent
   */
  getUser() {
    this._userService.getUserById(this._userService.getToken()).subscribe((data: UserModel) => {
      this.user = data;
    });

  }

  /**
   * Go to personal dato for user
   *
   * @memberof NavBarComponent
   */
  personalData() {
    this.router.navigate(['/personalData']);
  }

  /**
   * Go to favourites recipes
   *
   * @memberof NavBarComponent
   */
  recetasGuardadas() {
    this.router.navigate(['/recipes/1']);
  }

}
