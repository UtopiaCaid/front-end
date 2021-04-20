import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminFlightComponent } from './components/admin-flight/admin-flight.component';
import { AdminAircraftComponent } from './components/admin-aircraft/admin-aircraft.component';
import { AdminAircraftFormComponent } from './components/admin-aircraft-form/admin-aircraft-form.component';
import { AdminAircraftTypeComponent } from './components/admin-aircraftType/admin-aircraftType.component';
import { AdminAircraftTypeFormComponent } from 'src/app/components/admin-aircraftType-form/admin-aircraftType-form.component';  
import { AdminFlightFormComponent } from './components/admin-flight-form/admin-flight-form.component';
import { AdminTicketComponent } from './components/admin-ticket/admin-ticket.component';
import { AdminTicketFormComponent } from './components/admin-ticket-form/admin-ticket-form.component';
import { AdminTravelerComponent } from './components/admin-traveler/admin-traveler.component';
import { AdminTravelerFormComponent } from './components/admin-traveler-form/admin-traveler-form.component';
import { AdminAirportComponent } from './components/admin-airport/admin-airport.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import {AdminSignupComponent} from './components/admin-signup/admin-signup.component';
import { AdminEditAccountComponent } from './components/admin-edit-account/admin-edit-account.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';

import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserFlightsComponent } from './components/user-flights/user-flights.component';
import { UserTicketFormComponent } from './components/user-ticket-form/user-ticket-form.component';
import { UserCheckoutComponent } from './components/user-checkout/user-checkout.component';
import { UserTicketHistoryComponent } from './components/user-ticket-history/user-ticket-history.component';
import { UserFlightHistoryComponent } from './components/user-flight-history/user-flight-history.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';

import {AuthGuard} from "./guards/auth-guard/auth.guard";
import {GuestGuard} from "./guards/guest-guard/guest.guard";

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
        canActivate: [GuestGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [GuestGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_USER'
        }
      },
      {
        path: 'admin',
        component: AdminHomeComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/flights',
        component: AdminFlightComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/aircraft',
        component: AdminAircraftComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/aircraft/form',
        component: AdminAircraftFormComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/aircraftType',
        component: AdminAircraftTypeComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/aircraftType/form',
        component: AdminAircraftTypeFormComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/flight/form',
        component: AdminFlightFormComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/airport',
        component: AdminAirportComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
      path: 'admin/ticket',
      component: AdminTicketComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
      },
      {
        path: 'admin/ticket/form',
        component: AdminTicketFormComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
        },
      {
      path: 'admin/traveler',
      component: AdminTravelerComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
      },
      {
        path: 'admin/traveler/form',
        component: AdminTravelerFormComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
        },
      {
        path: 'admin/signup',
        component: AdminSignupComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/profile',
        component:  AdminProfileComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },
      {
        path: 'admin/profile/edit',
        component: AdminEditAccountComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_ADMIN'
        }
      },

      {
        path: 'user',
        component: UserHomeComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_USER'
        }
      },
      {
        path: 'user/flight',
        component: UserFlightsComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_USER'
        }
      },

      {
        path: 'user/ticket',
        component: UserTicketFormComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_USER'
        }
      },
      {
        path: 'user/history',
        component: UserHistoryComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_USER'
        }
      },

      {
        path: 'profile/edit',
        component: EditAccountComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_USER'
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
