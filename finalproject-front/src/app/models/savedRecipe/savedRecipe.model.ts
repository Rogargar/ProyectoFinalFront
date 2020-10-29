import { ElementModel } from './../element.model';
import { RecipeModel } from './../recipe/recipe.model';
import { UserModel } from './../user/user.model';
export class SavedRecipeModel extends ElementModel {
  id: string;
  name: string;
  user: UserModel;
  recipes: RecipeModel;

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
