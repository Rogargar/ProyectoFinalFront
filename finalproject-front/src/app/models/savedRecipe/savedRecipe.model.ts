import { ElementModel } from './../element.model';
import { RecipeModel } from './../recipe/recipe.model';
import { UserModel } from './../user/user.model';

/**
 * Model of save Recipe
 *
 * @export
 * @class SavedRecipeModel
 * @extends {ElementModel}
 */
export class SavedRecipeModel extends ElementModel {
  id: string;
  name: string;
  user: UserModel;
  recipes: RecipeModel;

  /**
   * Creates an instance of SavedRecipeModel.
   * @param {SavedRecipeModel} [props]
   * @memberof SavedRecipeModel
   */
  constructor(props?: SavedRecipeModel) {
    super(props);
    if (props === undefined) {
      this.id = null;
      this.name = null;
      this.user = new UserModel();
      this.recipes = new RecipeModel();

    }
    Object.assign(this, props);
  }
}
