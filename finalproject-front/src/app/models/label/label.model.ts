import { ElementModel } from '../element.model';

export class LabelModel extends ElementModel {
  id: string;
  name: string;

  constructor(props?: LabelModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.name = null;
    }
    Object.assign(this, props);
  }
}
