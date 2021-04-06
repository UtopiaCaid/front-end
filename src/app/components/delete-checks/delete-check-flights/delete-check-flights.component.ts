import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';

@Component({
  selector: 'app-delete-check-flights',
  templateUrl: './delete-check-flights.component.html',
  styleUrls: ['./delete-check-flights.component.css']
})
export class DeleteCheckFlightsComponent implements OnInit {

  constructor(
    private FlightService: AdminFlightService,
    public dialogRef: MatDialogRef<DeleteCheckFlightsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onDelete() {
    this.FlightService.deleteFlight(this.data.row.flightNo);
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
