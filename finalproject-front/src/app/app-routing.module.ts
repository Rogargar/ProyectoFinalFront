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
  { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

