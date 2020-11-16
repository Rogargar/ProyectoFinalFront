import { ElementModel } from '../element.model';

export class RolModel extends ElementModel {
  id: string;
  name: string;

  constructor(props?: RolModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.name = null;
    }
    Object.assign(this, props);
  }
}
