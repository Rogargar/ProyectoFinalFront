import swal  from 'sweetalert';
import { Injectable } from '@angular/core';
import { UserService } from './../services/user.service';
import { CanActivate, Router } from '@angular/router';
/**
 * If user don´t register, he don´t enter in some routers
 *
 * @export
 * @class CanActivateViaAuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) { }

  /**
   * If the user is not logged in we'll send them back to the home page
   *
   * @return {*}
   * @memberof CanActivateViaAuthGuard
   */
  canActivate() {
    if (!this.authService.getToken()) {
      swal('Usuario no logeado', 'Por favor registrate o entra con tus datos', 'error');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
