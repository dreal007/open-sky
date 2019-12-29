import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightComponent } from './flight/flight.component';
import { AuthGuard } from '../guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate : [AuthGuard]
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'flight',
    component: FlightComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
