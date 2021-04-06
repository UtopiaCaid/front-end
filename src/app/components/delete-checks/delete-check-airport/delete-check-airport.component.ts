import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';

@Component({
  selector: 'app-delete-check-airport',
  templateUrl: './delete-check-airport.component.html',
  styleUrls: ['./delete-check-airport.component.css']
})
export class DeleteCheckAirportComponent implements OnInit {

  constructor(
    private AirportService: AdminAirportService,
    public dialogRef: MatDialogRef<DeleteCheckAirportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onDelete() {
    this.AirportService.deleteAirport(this.data.row.airportId);
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
