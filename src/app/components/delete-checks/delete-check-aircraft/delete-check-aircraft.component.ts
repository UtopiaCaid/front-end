import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';

@Component({
  selector: 'app-delete-check-aircraft',
  templateUrl: './delete-check-aircraft.component.html',
  styleUrls: ['./delete-check-aircraft.component.css']
})
export class DeleteCheckAircraftComponent implements OnInit {

  constructor(
    private AircraftService: AdminAircraftService,
    public dialogRef: MatDialogRef<DeleteCheckAircraftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onDelete() {
    this.AircraftService.deleteAircraft(this.data.row.aircraftId);
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
