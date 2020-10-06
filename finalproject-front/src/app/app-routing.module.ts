import { HomeComponent } from './modules/finalProject/components/home/home.component';
import { UserComponent } from './modules/finalProject/components/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: UserComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

