import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';

@Component({
  selector: 'app-admin-airports-form',
  templateUrl: './admin-airports-form.component.html',
  styleUrls: ['./admin-airports-form.component.css']
})
export class AdminAirportsFormComponent implements OnInit {

  constructor(
    private AirportService: AdminAirportService,
    public dialogRef: MatDialogRef<AdminAirportsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.populate();
  }

  airportCode = new FormControl(0, [Validators.required]);
  city = new FormControl('', [Validators.required]);
  airportName = new FormControl('', [Validators.required]);
  status = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.airportCode.hasError('required') ? 'you must enter a airport Code' :
      this.city.hasError('required') ? 'you must a city' :
        this.airportName.hasError('required') ? 'you must enter a airport name' :
          this.status.hasError('required') ? 'you must enter a status' : '';
  }

  public populate() {
    if (this.data) {
      this.airportCode.setValue(this.data.row.airportCode);
      this.city.setValue(this.data.row.city);
      this.airportName.setValue(this.data.row.airportName);
      this.status.setValue(this.data.row.status);
    }
  }

  public formSubmit() {
    if (
      this.airportCode.hasError('required') ||
      this.city.hasError('required') ||
      this.airportName.hasError('required') ||
      this.status.hasError('required')) {
      alert('Please insert the required fields')
    } else if (this.data) {
      this.AirportService.updateAirport(
        this.data.row.airportId,
        this.airportCode.value,
        this.city.value,
        this.airportName.value,
        this.status.value
      )
      this.dialogRef.close();
    } else {
      this.AirportService.insertAirport(
        this.airportCode.value,
        this.city.value,
        this.airportName.value,
        this.status.value
      )
      this.dialogRef.close();
    }

  }

}
