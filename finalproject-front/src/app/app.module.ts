import { NavBarComponent } from './components/navBar/navBar.component';
import { CanActivateViaAuthGuard } from './guard/canActivateViaAuthGuard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../app/modules/finalProject/components/user/user.component';
/*import { FormBuilder, FormControl, Validators } from '@angular/forms';*/
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/finalProject/components/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './modules/finalProject/components/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from './modules/finalProject/components/contact/contact.component';
import { config } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserComponent,
    HomeComponent,
    RegisterComponent,
    ContactComponent
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
  ],
  providers: [
    CookieService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
