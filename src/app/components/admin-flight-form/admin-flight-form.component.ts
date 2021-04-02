import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';

interface Airport {
  airportCode: number;
  city: string;
  airportName: string;
  status: string;
}

interface Aircraft {
  aircraftId: number;
  seatCount: number;
  firstClassCount: number;
  secondClassCount: number;
  thirdClassCount: number;
  aircraftType: {
    aircraftTypeName: string;
  };
  aircraftStatus: string;
}

@Component({
  selector: 'app-admin-flight-form',
  templateUrl: './admin-flight-form.component.html',
  styleUrls: ['./admin-flight-form.component.css']
})
export class AdminFlightFormComponent implements OnInit {

  ngOnInit(): void {
    this.getAllAirports();
    this.getAllAircraft();
  }

  constructor(
    private Airportservice: AdminAirportService,
    private Aircraftservice: AdminAircraftService,
    private FlightService: AdminFlightService
  ) { }

  public getAllAirports() {
    let res = this.Airportservice.retrieveAirports();
    res.subscribe(airport => this.airports = airport as Airport[]);
  }

  public getAllAircraft() {
    let res = this.Aircraftservice.retrieveAircraft();
    res.subscribe(aircraft => this.aircrafts = aircraft as Aircraft[]);
  }

  selectedAirportDep!: {};
  selectedAirportArr!: {};
  airports!: Airport[];
  selectedAircraft!: {};
  aircrafts!: Aircraft[];


  flightGate = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  status = new FormControl('', [Validators.required]);
  dateArr = new FormControl('', [Validators.required]);
  dateDep = new FormControl('', [Validators.required]);
  basePrice = new FormControl(0, [Validators.required]);
  aircraftCheck = new FormControl(this.aircrafts, [Validators.required]);
  airportDepCheck = new FormControl(this.selectedAirportDep, [Validators.required]);
  airportArrCheck = new FormControl(this.selectedAirportArr, [Validators.required]);



  getErrorMessage() {
    return this.flightGate.hasError('required') ? 'You must enter a gate value' :
      this.status.hasError('required') ? 'you must enter a status value' :
        this.dateArr.hasError('required') ? 'you must enter a arrival time' :
          this.dateDep.hasError('required') ? 'you must enter a departure time' :
            this.basePrice.hasError('required') ? 'you must enter a base price value' :
              this.aircraftCheck.hasError('required') ? 'you must enter an aircraft' : 
                this.airportDepCheck.hasError('required') ? 'you must enter a departure airport' : 
                  this.airportArrCheck.hasError('required') ? 'you must enter an arrival airport' : '';
  }


  public formSubmit() {
    if (
      this.flightGate.hasError('required') ||
      this.status.hasError('required') ||
      this.dateArr.hasError('required') ||
      this.dateDep.hasError('required') ||
      this.basePrice.hasError('required') ||
      this.aircraftCheck.hasError('required') ||
      this.airportDepCheck.hasError('required') ||
      this.airportArrCheck.hasError('required')
    ) {
      alert('Please insert the required fields')
    } else {
      this.FlightService.insertFlight(
        this.flightGate.value,
        this.selectedAirportDep,
        this.selectedAirportArr,
        this.selectedAircraft,
        this.basePrice.value,
        this.dateDep.value,
        this.dateArr.value,
        this.status.value
      );
    }
  }
}
