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
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
// import {MatToolbarModule} from '@angular/material/toolbar'; 
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
import { AngularMaterialModule } from './angular-material.module';
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
import { AdminAirportsFormComponent } from './components/admin-airports-form/admin-airports-form.component';



//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginMiniComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
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
    AdminAirportsFormComponent
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
