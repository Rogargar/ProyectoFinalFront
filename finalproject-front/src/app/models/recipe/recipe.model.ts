import { LabelModel } from './../label/label.model';
import { UserModel } from './../user/user.model';
import { ElementModel } from '../element.model';

/**
 * Model for recipes
 *
 * @export
 * @class RecipeModel
 * @extends {ElementModel}
 */
export class RecipeModel extends ElementModel {
  id: string;
  name: string;
  difficulty: string;
  img: string;
  ingredients: string;
  preparation: string;
  ration: string;
  suggestions: string;
  owner: UserModel;
  time: string;
  state: string;
  publicationDate: string;
  label: LabelModel[];

  /**
   * Creates an instance of RecipeModel.
   * @param {RecipeModel} [props]
   * @memberof RecipeModel
   */
  constructor(props?: RecipeModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.name = null;
      this.difficulty = null;
      this.img = null;
      this.ingredients = null;
      this.preparation = null;
      this.ration = null;
      this.suggestions = null;
      this.owner = new UserModel();
      this.time = null;
      this.state = null;
      this.publicationDate = null;
      this.label = [];

    }
    Object.assign(this, props);
  }
}
