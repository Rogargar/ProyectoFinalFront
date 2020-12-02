import { AddEditRecipeComponent } from './modules/finalProject/components/add-edit-recipe/add-edit-recipe.component';
import { PersonalDataComponent } from './modules/finalProject/components/personal-data/personal-data.component';
import { UserRecipesComponent } from './modules/finalProject/components/user-recipes/user-recipes.component';
import { RecipesComponent } from './modules/finalProject/components/recipes/recipes.component';
import { RecipeComponent } from './modules/finalProject/components/recipe/recipe.component';
import { LabelComponent } from './modules/finalProject/components/label/label.component';
import { ContactComponent } from './modules/finalProject/components/contact/contact.component';
import { CanActivateViaAuthGuard } from './guard/canActivateViaAuthGuard';
import { RegisterComponent } from './modules/finalProject/components/register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/finalProject/components/home/home.component';
import { UserComponent } from './modules/finalProject/components/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
  { path: 'recipes', component: RecipesComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: 'recipes/:id', component: RecipesComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: ':id/recipe', component: RecipeComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: 'help', component: ContactComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: ':id/label', component: LabelComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: ':id/user', component: UserRecipesComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: ':id/user/:creator', component: UserRecipesComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: 'personalData', component: PersonalDataComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: 'add', component: AddEditRecipeComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
  { path: 'edit/:id', component: AddEditRecipeComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

