import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService} from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service'; 

/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-admin-aircraftType-form',
  templateUrl: './admin-aircraftType-form.component.html',
  styleUrls: ['./admin-aircraftType-form.component.css']
})
export class AdminAircraftTypeFormComponent implements OnInit {

  ngOnInit(): void {
    this.populate();
  }

  constructor(
    private AircraftTypeService: AdminAircraftTypeService,
    public dialogRef: MatDialogRef<AdminAircraftTypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  aircraftTypeId = new FormControl(0, [Validators.required]);
  aircraftTypeName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]);
  seatMaximum = new FormControl(0, [Validators.required, Validators.min(0)]);
  manufacturer = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]);

  isUpdate() {
    return this.data.update;
  }
  getErrorMessage(number : number) {
    switch(number) {
      case 1:
        return this.aircraftTypeId.hasError('required') ? 'you must enter an aircraft type id' : 'error';
      case 2:
        return this.aircraftTypeName.hasError('required') ? 'you must enter an aircraft name' :
        this.aircraftTypeName.hasError('minLength') ? 'Aircraft Name too short' :
        this.aircraftTypeName.hasError('maxLength') ? 'Aircraft Name too long' : 'error';
      case 3:
        return this.seatMaximum.hasError('required') ? 'you must enter a seat maximum' : 
        this.seatMaximum.hasError('min') ? 'Seat Maximum must be non-negative' : 'error';
      case 4:
        return this.manufacturer.hasError('required') ? 'you must enter a manufacturer' :
        this.manufacturer.hasError('minLength') ? 'Manufacturer Name too short' :
        this.manufacturer.hasError('maxLength') ? 'Manufacturer Name too long' : 'error';
      default:
        return 'an unprocessable error has occurred';
    }
  }

  public populate() {
    if (this.data.update) {
      console.log('An aircraft type is edited not created')
      this.aircraftTypeId.setValue(this.data.row.aircraftTypeId);
      this.aircraftTypeName.setValue(this.data.row.aircraftTypeName);
      this.seatMaximum.setValue(this.data.row.seatMaximum);
      this.manufacturer.setValue(this.data.row.manufacturer);
    }
  }

  public formSubmit() {
    console.log(this.aircraftTypeId.value);
    console.log(this.aircraftTypeName.value);
    console.log(this.seatMaximum.value);
    console.log(this.manufacturer.value);
    if (
      this.aircraftTypeId.hasError('required') ||
      this.aircraftTypeName.hasError('required') ||
      this.seatMaximum.hasError('required') ||
      this.manufacturer.hasError('required')
    ) {
      alert('Please insert the required fields');
    } else if (this.aircraftTypeName.hasError('minLength') ||
      this.aircraftTypeName.hasError('maxLength') ||
      this.manufacturer.hasError('minLength') || 
      this.manufacturer.hasError('maxLength')
    ) {
      alert('Invalid Field Value(s)'); 
    } else if (this.data.update) {
      this.AircraftTypeService.updateAircraftType(
        this.data.row.aircraftTypeId,
        this.aircraftTypeName.value,
        this.seatMaximum.value,
        this.manufacturer.value,
      )
      this.dialogRef.close();
    } else {
      this.AircraftTypeService.insertAircraftType(
        this.aircraftTypeId.value,
        this.aircraftTypeName.value,
        this.seatMaximum.value,
        this.manufacturer.value,
      );
      this.dialogRef.close();
    }
  }
}
