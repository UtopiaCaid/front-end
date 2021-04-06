import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService} from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service'; 

/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

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
    this.populate();
  }

  constructor(
    private AircraftService: AdminAircraftService,
    private AircraftTypeService: AdminAircraftTypeService,
    public dialogRef: MatDialogRef<AdminAircraftFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public getAllAircraftTypes() {
    let res = this.AircraftTypeService.retrieveAircraftTypes();
    res.subscribe(aircraftType => this.aircraftTypes = aircraftType as AircraftType[]);
  }

  selectedAircraftType!: {};
  aircraftTypes!: AircraftType[];

  compareFunctionAircraftType(o1: any, o2: any) {
    return o1 && o2 ? o1.aircraftTypeId === o2.aircraftTypeId : o1 === o2;
  }

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

  public populate() {
    if (this.data) {
      console.log('An aircraft is edited not created')
      console.log(this.data.row);
      this.seatCount.setValue(this.data.row.seatCount);
      this.firstClassCount.setValue(this.data.row.firstClassCount);
      this.secondClassCount.setValue(this.data.row.secondClassCount);
      this.thirdClassCount.setValue(this.data.row.thirdClassCount);
      this.aircraftStatus.setValue(this.data.row.aircraftStatus);
      this.selectedAircraftType = this.data.row.aircraftType;
      console.log(this.selectedAircraftType);

    }
  }

  public formSubmit() {
    if (
      this.selectedAircraftType == undefined ||
      this.seatCount.hasError('required') ||
      this.firstClassCount.hasError('required') ||
      this.secondClassCount.hasError('required') ||
      this.thirdClassCount.hasError('required') ||
      this.aircraftStatus.hasError('required') 
    ) {
      alert('Please insert the required fields')
    } else if (this.seatCount.value < this.firstClassCount.value + this.secondClassCount.value + this.thirdClassCount.value) {
      alert('Number of class seats cannot exceed the total seat count');
      console.log("Broke"); 
    } else if (this.data) {
      this.AircraftService.updateAircraft(
        this.data.row.aircraftId,
        this.selectedAircraftType,
        this.seatCount.value,
        this.firstClassCount.value,
        this.secondClassCount.value,
        this.thirdClassCount.value,
        this.aircraftStatus.value,
      )
      this.dialogRef.close();
    } else {
      this.AircraftService.insertAircraft(
        this.selectedAircraftType,
        this.seatCount.value,
        this.firstClassCount.value,
        this.secondClassCount.value,
        this.thirdClassCount.value,
        this.aircraftStatus.value,
      );
      this.dialogRef.close();
    }
  }
}
