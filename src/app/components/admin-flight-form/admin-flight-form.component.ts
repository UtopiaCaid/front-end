import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

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
    this.populate();
  }

  constructor(
    private Airportservice: AdminAirportService,
    private Aircraftservice: AdminAircraftService,
    private FlightService: AdminFlightService,
    public dialogRef: MatDialogRef<AdminFlightFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  selectedAirportDep!: {};
  selectedAirportArr!: {};
  airports!: Airport[];
  selectedAircraft!: {};
  aircrafts!: Aircraft[];

  public getAllAirports() {
    let res = this.Airportservice.retrieveAirports();
    res.subscribe(airport => this.airports = airport as Airport[]);
  }

  public getAllAircraft() {
    let res = this.Aircraftservice.retrieveAircraft();
    res.subscribe(aircraft => this.aircrafts = aircraft as Aircraft[]);
  }


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
              this.aircraftCheck.hasError('required') ? 'you must enter an aircraft' : this.airportDepCheck.hasError('required') ? 'you must enter a departure airport' : this.airportArrCheck.hasError('required') ? 'you must enter an arrival airport' : '';
  }

  public populate() {
    if (this.data) {
      console.log('A flight is edited not created')
      console.log(this.data.row);
      this.flightGate.setValue(this.data.row.flightGate);
      this.status.setValue(this.data.row.status);
      this.dateArr.setValue(this.data.row.arrival);
      this.dateDep.setValue(this.data.row.departure);
      this.basePrice.setValue(this.data.row.basePrice);
      this.selectedAirportDep = this.data.row.airportDeparture;
      this.selectedAirportArr = this.data.row.airportArrival;
      this.selectedAircraft = this.data.row.aircraft;
      this.airportArrCheck.setValue(this.data.row.airportArrival);
      console.log(this.selectedAirportDep);
      console.log(this.selectedAirportArr);
      console.log(this.dateDep);
    }
  }

  compareFunctionAirport(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.airportId === o2.airportId : o1 === o2;
  }

  compareFunctionAircraft(o1: any, o2: any) {
    return (o1.aircraftId == o2.aircraftId);
  }

  public formSubmit() {
    if (
      this.flightGate.hasError('required') ||
      this.status.hasError('required') ||
      this.dateArr.hasError('required') ||
      this.dateDep.hasError('required') ||
      this.basePrice.hasError('required') ||
      this.selectedAircraft == undefined ||
      this.selectedAirportDep == undefined ||
      this.selectedAirportArr == undefined
    ) {
      alert('Please insert the required fields')
    } else if (this.data) {
      this.FlightService.updateFlight(
        this.data.row.flightNo,
        this.flightGate.value,
        this.selectedAirportDep,
        this.selectedAirportArr,
        this.selectedAircraft,
        this.basePrice.value,
        this.dateDep.value,
        this.dateArr.value,
        this.status.value
      )
      this.dialogRef.close();
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
      this.dialogRef.close();
    }
  }
}
