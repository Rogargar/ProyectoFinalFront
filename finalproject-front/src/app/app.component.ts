import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { UserModel } from './models/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finalproject-front';
  users: UserModel[];
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    })
  }
}
