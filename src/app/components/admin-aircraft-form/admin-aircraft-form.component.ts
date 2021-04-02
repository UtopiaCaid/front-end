import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService} from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service'; 

interface AircraftType {
  aircraftTypeId: number;
  aircraftTypeName: string;
  seatMaximum: number;
  manufacturer: string;
  aircraftStatus: string;
}

@Component({
  selector: 'app-admin-aircraft-form',
  templateUrl: './admin-aircraft-form.component.html',
  styleUrls: ['./admin-aircraft-form.component.css']
})
export class AdminAircraftFormComponent implements OnInit {

  ngOnInit(): void {
    this.getAllAircraftTypes();
  }

  constructor(
    private AircraftService: AdminAircraftService,
    private AircraftTypeService: AdminAircraftTypeService,
  ) { }

  public getAllAircraftTypes() {
    let res = this.AircraftTypeService.retrieveAircraftTypes();
    res.subscribe(aircraftType => this.aircraftTypes = aircraftType as AircraftType[]);
  }

  selectedAircraftType!: {};
  aircraftTypes!: AircraftType[];


  seatCount = new FormControl(0, [Validators.required]);
  firstClassCount = new FormControl(0, [Validators.required]);
  secondClassCount = new FormControl(0, [Validators.required]);
  thirdClassCount = new FormControl(0, [Validators.required]);
  aircraftStatus = new FormControl('', [Validators.required]);
  aircraftCheck = new FormControl(this.aircraftTypes, [Validators.required]);


  getErrorMessage() {
    return this.aircraftCheck.hasError('required') ? 'you must enter an aircraft type' : 
    this.seatCount.hasError('required') ? 'you must enter a seat count' :
      this.firstClassCount.hasError('required') ? 'you must enter a first class count' :
        this.secondClassCount.hasError('required') ? 'you must enter a second class count' :
          this.thirdClassCount.hasError('required') ? 'you must enter a third class count' :
            this.aircraftStatus.hasError('required') ? 'you must enter an aircraft status' : '';
  }


  public formSubmit() {
    console.log(this.aircraftCheck);
    if (
     // this.aircraftCheck.hasError('required') ||
      this.seatCount.hasError('required') ||
      this.firstClassCount.hasError('required') ||
      this.secondClassCount.hasError('required') ||
      this.thirdClassCount.hasError('required') ||
      this.aircraftStatus.hasError('required') 
    ) {
      alert('Please insert the required fields')
    } else {
      this.AircraftService.insertAircraft(
        this.selectedAircraftType,
        this.seatCount.value,
        this.firstClassCount.value,
        this.secondClassCount.value,
        this.thirdClassCount.value,
        this.aircraftStatus.value,
      );
    }
  }
}
