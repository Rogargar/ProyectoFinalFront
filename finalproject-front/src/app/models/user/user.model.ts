import { RolModel } from './../rol/rol.model';
import { ElementModel } from '../element.model';

export class UserModel extends ElementModel {
  id: string;
  email: string;
  name: string;
  pass: string;
  rol: RolModel[];
  surnames: string;
  constructor(props?: UserModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.email = null;
      this.name = null;
      this.pass = null;
      this.rol = [];
      this.surnames = null;
    }
    Object.assign(this, props);
  }
}
