import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService } from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service';

@Component({
  selector: 'app-delete-check-aircraftType',
  templateUrl: './delete-check-aircraftType.component.html',
  styleUrls: ['./delete-check-aircraftType.component.css']
})
export class DeleteCheckAircraftTypeComponent implements OnInit {

  constructor(
    private AircraftTypeService: AdminAircraftTypeService,
    public dialogRef: MatDialogRef<DeleteCheckAircraftTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onDelete() {
    this.AircraftTypeService.deleteAircraftType(this.data.row.aircraftTypeId);
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
