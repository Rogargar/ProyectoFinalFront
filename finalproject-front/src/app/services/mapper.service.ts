import { Injectable } from '@angular/core';
import { UserModel } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapUsers(item: any): UserModel {
    return item ? new UserModel({
      id: item.id,
      email: item.email,
      name: item.name,
      pass: item.pass,
      rol: item.rol,
      surnames: item.surnames,
    }) : null

  }

}
