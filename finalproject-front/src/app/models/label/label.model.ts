import { ElementModel } from '../element.model';

/**
 * Model of label
 *
 * @export
 * @class LabelModel
 * @extends {ElementModel}
 */
export class LabelModel extends ElementModel {
  id: string;
  name: string;

  /**
   * Creates an instance of LabelModel.
   * @param {LabelModel} [props]
   * @memberof LabelModel
   */
  constructor(props?: LabelModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.name = null;
    }
    Object.assign(this, props);
  }
}
