import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginMiniComponent } from './components/loginMini/loginMini.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { AngularMaterialModule } from './angular-material.module';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminFlightsComponent } from './components/admin-flights/admin-flights.component';
import { AdminAircraftComponent } from './components/admin-aircraft/admin-aircraft.component';
import { AdminAircraftFormComponent } from './components/admin-aircraft-form/admin-aircraft-form.component';
import { AdminAircraftTypeComponent } from './components/admin-aircraftType/admin-aircraftType.component';
import { AdminAircraftTypeFormComponent } from './components/admin-aircraftType-form/admin-aircraftType-form.component';
import { AdminFlightFormComponent } from './components/admin-flight-form/admin-flight-form.component';
import { fromEventPattern } from 'rxjs';
import { AdminAirportsComponent } from './components/admin-airports/admin-airports.component';
import { DeleteCheckFlightsComponent } from './components/delete-checks/delete-check-flights/delete-check-flights.component';
import { DeleteCheckAircraftComponent } from './components/delete-checks/delete-check-aircraft/delete-check-aircraft.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { AdminAirportsFormComponent } from './components/admin-airports-form/admin-airports-form.component';
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';
import { AdminEditAccountComponent } from './components/admin-edit-account/admin-edit-account.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginMiniComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    ProfileComponent,
    AdminHomeComponent,
    AdminFlightsComponent,
    AdminAircraftComponent,
    AdminAircraftFormComponent,
    AdminAircraftTypeComponent,
    AdminAircraftTypeFormComponent,
    AdminFlightFormComponent,
    AdminAirportsComponent,
    DeleteCheckFlightsComponent,
    DeleteCheckAircraftComponent,
    EditAccountComponent,
    AdminAirportsFormComponent,
    AdminSignupComponent,
    AdminEditAccountComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //  NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatListModule
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
