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
  aircraftTypeName = new FormControl('', [Validators.required]);
  seatMaximum = new FormControl(0, [Validators.required]);
  manufacturer = new FormControl('', [Validators.required]);

  isUpdate() {
    return this.data.update;
  }
  getErrorMessage() {
    return this.aircraftTypeId.hasError('required') ? 'you must enter an aircraft type id' :
      this.aircraftTypeName.hasError('required') ? 'you must enter an aircraft name' :
        this.seatMaximum.hasError('required') ? 'you must enter a seat maximum' :
          this.manufacturer.hasError('required') ? 'you must enter a manufacturer' :'';
  }

  public populate() {
    if (this.data) {
      console.log('An aircraft type is edited not created')
      console.log(this.data.row);
      this.aircraftTypeId.setValue(this.data.row.aircraftTypeId);
      this.aircraftTypeName.setValue(this.data.row.aircraftTypeName);
      this.seatMaximum.setValue(this.data.row.seatMaximum);
      this.manufacturer.setValue(this.data.row.manufacturer);
    }
  }

  public formSubmit() {
    if (
      this.aircraftTypeId.hasError('required') ||
      this.aircraftTypeName.hasError('required') ||
      this.seatMaximum.hasError('required') ||
      this.manufacturer.hasError('required')
    ) {
      alert('Please insert the required fields');
    } else if (this.data) {
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
