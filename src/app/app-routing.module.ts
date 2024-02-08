import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'weather-search', component: WeatherSearchComponent },
  { path: '**', redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
