import { UserModel } from './../../../../models/user/user.model';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  idUser;
  user: UserModel;
  users: UserModel[];

  constructor(private _userService: UserService) {
    this.getIdUser();
    this.getUser();
  }

  ngOnInit(): void {
  }

  getIdUser() {
    this.idUser = this._userService.getToken();
  }

  getUser() {
    this._userService.getUserById(this.idUser).subscribe((data: UserModel) => {
      if (data.roles[0].id === '1') {
        this._userService.getUsers().subscribe((datas: UserModel[]) => {
          this.users = datas;
        });
      } else {
        this.user = data;
      }

    });
  }

  editUser() {

  }


}
