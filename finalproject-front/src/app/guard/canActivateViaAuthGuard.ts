import { Injectable } from '@angular/core';
import { UserService } from './../services/user.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.getToken()) {
      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
