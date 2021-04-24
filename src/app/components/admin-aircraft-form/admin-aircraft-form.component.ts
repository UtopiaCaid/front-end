import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService } from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service';
import { AircraftTypeData as AircraftType} from 'src/app/entities';

/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

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

  selectedAircraftType!: AircraftType;
  aircraftTypes!: AircraftType[];

  compareFunctionAircraftType(o1: any, o2: any) {
    return o1 && o2 ? o1.aircraftTypeId === o2.aircraftTypeId : o1 === o2;
  }

  seatCount = new FormControl(0, [Validators.required, Validators.min(0)]);
  firstClassCount = new FormControl(0, [Validators.required, Validators.min(0)]);
  secondClassCount = new FormControl(0, [Validators.required, Validators.min(0)]);
  thirdClassCount = new FormControl(0, [Validators.required, Validators.min(0)]);
  aircraftStatus = new FormControl('', [Validators.required]);
  aircraftCheck = new FormControl(this.aircraftTypes, [Validators.required]);

  getErrorMessage(number : number) {
    switch(number) {
      case 1:
        return this.aircraftCheck.hasError('required') ? 'you must enter an aircraft type' : 'error';
      case 2:
        return this.seatCount.hasError('required') ? 'you must enter a seat count' : 'error';
      case 3:
        return this.firstClassCount.hasError('required') ? 'you must enter a first class count' :
        this.firstClassCount.hasError('min') ? 'first class count must be non-negative' : 'error'
      case 4:
        return this.secondClassCount.hasError('required') ? 'you must enter a second class count' :
        this.secondClassCount.hasError('min') ? 'second class count must be non-negative' : 'error'
      case 5:
        return this.thirdClassCount.hasError('required') ? 'you must enter a third class count' :
        this.thirdClassCount.hasError('min') ? 'third class count must be non-negative' : 'error'
      case 6:
        return this.aircraftStatus.hasError('required') ? 'you must enter an aircraft status' : '';
      default:
        return 'unprocessed error '
    }
  }

  public populate() {
    if (this.data.row) {
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

  public getSubmitMessage() {
    return this.data.errorUpdate;
  }

  public submitReady() {
    return this.data.errorUpdate == '' ? true : false;
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
      this.data.errorUpdate = ('Please insert the required fields')
    } else if (
      this.firstClassCount.hasError('min') ||
      this.secondClassCount.hasError('min') ||
      this.thirdClassCount.hasError('min')
    ) {
      this.data.errorUpdate = ('Invalid Field Value(s)'); 
    }  else if (this.seatCount.value < this.firstClassCount.value + this.secondClassCount.value + this.thirdClassCount.value) {
      this.data.errorUpdate = ('Number of class seats cannot exceed the total seat count');
    } else if(this.seatCount.value > this.selectedAircraftType.seatMaximum) {
      this.data.errorUpdate = ('Maximum Aircraft Seat Count is ' + this.selectedAircraftType.seatMaximum);
    } else if (this.data.row != undefined) {
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
