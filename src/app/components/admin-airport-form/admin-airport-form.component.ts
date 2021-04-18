import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';

@Component({
  selector: 'app-admin-airport-form',
  templateUrl: './admin-airport-form.component.html',
  styleUrls: ['./admin-airport-form.component.css']
})
export class AdminAirportFormComponent implements OnInit {

  constructor(
    private AirportService: AdminAirportService,
    public dialogRef: MatDialogRef<AdminAirportFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.populate();
  }

  airportCode = new FormControl(0, [Validators.required, Validators.min(0)]);
  city = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]);
  airportName = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]);
  status = new FormControl('', [Validators.required]);

  getErrorMessage(number : number) {
    switch(number) {
      case 1:
        return this.airportCode.hasError('required') ? 'you must enter a airport Code' :
        this.airportCode.hasError('min') ? 'Airport Code must be Non-Negative' : 'error';
      case 2:
        return this.city.hasError('required') ? 'you must a city' :
        this.city.hasError('minLength') ? 'the city minimum length is 3 characters' :
        this.city.hasError('maxLength') ? 'the city maximum length is 45 characters' : 'error';
      case 3:
        return this.airportName.hasError('required') ? 'you must enter a airport name' :
        this.airportName.hasError('minLength') ? 'the airport name minimum length is 3 characters' :
        this.airportName.hasError('maxLength') ? 'the airport maximum length is 45 characters' : 'error'
      case 4:
        return this.status.hasError('required') ? 'you must enter a status' : 'error';
      default:
        return 'unprocessed error '
    }
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
    } else if(
      this.airportCode.hasError('min') ||
      this.city.hasError('minLength') || this.city.hasError('maxLength') ||
      this.airportName.hasError('minLength') || this.airportName.hasError('maxLength')
      ) {
        alert('Invalid Field Value(s)');
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
