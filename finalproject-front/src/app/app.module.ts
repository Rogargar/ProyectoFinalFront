import { CanActivateViaAuthGuard } from './guard/canActivateViaAuthGuard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UserComponent,
    HomeComponent,
    RegisterComponent
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
  ],
  providers: [
    CookieService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
