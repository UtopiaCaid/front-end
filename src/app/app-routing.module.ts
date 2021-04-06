import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminFlightsComponent } from './components/admin-flights/admin-flights.component';
import { AdminAircraftComponent } from './components/admin-aircraft/admin-aircraft.component';
import { AdminAircraftFormComponent } from './components/admin-aircraft-form/admin-aircraft-form.component';
import { AdminAircraftTypeComponent } from './components/admin-aircraftType/admin-aircraftType.component';
import { AdminAircraftTypeFormComponent } from 'src/app/components/admin-aircraftType-form/admin-aircraftType-form.component';  
import { AdminFlightFormComponent } from './components/admin-flight-form/admin-flight-form.component';
import { AdminAirportsComponent } from './components/admin-airports/admin-airports.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'admin',
        component: AdminHomeComponent,
      },
      {
        path: 'admin/flights',
        component: AdminFlightsComponent,
      },
      {
        path: 'admin/aircraft',
        component: AdminAircraftComponent
      },
      {
        path: 'admin/aircraft/form',
        component: AdminAircraftFormComponent
      },
      {
        path: 'admin/aircraftType',
        component: AdminAircraftTypeComponent
      },
      {
        path: 'admin/aircraftType/form',
        component: AdminAircraftTypeFormComponent
      },
      {
        path: 'admin/flights/form',
        component: AdminFlightFormComponent,
      },
      {
        path: 'admin/airports',
        component: AdminAirportsComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
