import { UserModel } from './../user/user.model';
import { ElementModel } from '../element.model';

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

    }
    Object.assign(this, props);
  }
}
