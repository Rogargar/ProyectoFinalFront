/**
 * Model of element
 *
 * @export
 * @class ElementModel
 */
export class ElementModel {
  id: string;
  name: string;

  /**
   * Creates an instance of ElementModel.
   * @param {ElementModel} [props]
   * @memberof ElementModel
   */
  constructor(props?: ElementModel) {
    if (props === undefined) {
      this.id = null;
      this.name = null;
    }
    Object.assign(this, props);
  }
}
