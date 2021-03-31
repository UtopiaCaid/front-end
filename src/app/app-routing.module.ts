import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminFlightsComponent } from './components/admin-flights/admin-flights.component';
import { AdminFlightFormComponent } from './components/admin-flight-form/admin-flight-form.component';

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
        path: 'admin/flights/form',
        component: AdminFlightFormComponent,
      }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
