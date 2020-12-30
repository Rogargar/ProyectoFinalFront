import { ElementModel } from '../element.model';

/**
 * Model of rol
 *
 * @export
 * @class RolModel
 * @extends {ElementModel}
 */
export class RolModel extends ElementModel {
  id: string;
  name: string;

  /**
   * Creates an instance of RolModel.
   * @param {RolModel} [props]
   * @memberof RolModel
   */
  constructor(props?: RolModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.name = null;
    }
    Object.assign(this, props);
  }
}
