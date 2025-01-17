import { AddEditRecipeComponent } from './modules/finalProject/components/add-edit-recipe/add-edit-recipe.component';
import { PersonalDataComponent } from './modules/finalProject/components/personal-data/personal-data.component';
import { RecipeComponent } from './modules/finalProject/components/recipe/recipe.component';
import { LabelComponent } from './modules/finalProject/components/label/label.component';
import { NavBarComponent } from './components/navBar/navBar.component';
import { CanActivateViaAuthGuard } from './guard/canActivateViaAuthGuard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

/*Angular Material */
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';

import { UserComponent } from '../app/modules/finalProject/components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/finalProject/components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './modules/finalProject/components/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from './modules/finalProject/components/contact/contact.component';
import { RecipesComponent } from './modules/finalProject/components/recipes/recipes.component';
import { UserRecipesComponent } from './modules/finalProject/components/user-recipes/user-recipes.component';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NgxPaginationModule } from 'ngx-pagination';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserComponent,
    HomeComponent,
    RegisterComponent,
    ContactComponent,
    LabelComponent,
    RecipeComponent,
    RecipesComponent,
    UserRecipesComponent,
    PersonalDataComponent,
    AddEditRecipeComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    NgxPaginationModule,
    MatFormFieldModule,
    CKEditorModule,
    AutocompleteLibModule
  ],
  providers: [
    CookieService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
