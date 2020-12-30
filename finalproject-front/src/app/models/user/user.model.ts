import { RolModel } from './../rol/rol.model';
import { ElementModel } from '../element.model';

/**
 * Model of user
 *
 * @export
 * @class UserModel
 * @extends {ElementModel}
 */
export class UserModel extends ElementModel {
  id: string;
  email: string;
  name: string;
  pass: string;
  roles: RolModel[];
  surnames: string;
  img: string;

  /**
   * Creates an instance of UserModel.
   * @param {UserModel} [props]
   * @memberof UserModel
   */
  constructor(props?: UserModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.email = null;
      this.name = null;
      this.pass = null;
      this.roles = [];
      this.surnames = null;
      this.img = null;
    }
    Object.assign(this, props);
  }
}
