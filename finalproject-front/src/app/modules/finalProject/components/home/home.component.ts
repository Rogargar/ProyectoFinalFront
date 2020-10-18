import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: UserModel;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser() {
    this._userService.getUserById(this._userService.getToken()).subscribe(data => {
      console.log(data);
      this.user=data;
    })

  }

}
