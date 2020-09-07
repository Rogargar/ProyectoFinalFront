export class ElementModel {
  id: string;
  name: string;

  constructor(props?: ElementModel) {
    if (props === undefined) {
      this.id = null;
      this.name = null;
    }
    Object.assign(this, props);
  }
}
