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
// import {MatToolbarModule} from '@angular/material/toolbar'; 
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
import { AngularMaterialModule } from './angular-material.module';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminFlightsComponent } from './components/admin-flights/admin-flights.component';
import { AdminAircraftComponent } from './components/admin-aircraft/admin-aircraft.component';
import { AdminAircraftTypeComponent } from './components/admin-aircraftType/admin-aircraftType.component';


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
    AdminAircraftTypeComponent
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
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
