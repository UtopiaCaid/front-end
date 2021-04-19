import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminTravelerServiceService as AdminTravelerService } from 'src/app/services/admin-traveler-service/admin-traveler-service.service';

@Component({
  selector: 'app-delete-check-traveler',
  templateUrl: './delete-check-traveler.component.html',
  styleUrls: ['./delete-check-traveler.component.css']
})
export class DeleteCheckTravelerComponent implements OnInit {

  constructor(
    private TravelerService: AdminTravelerService,
    public dialogRef: MatDialogRef<DeleteCheckTravelerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onDelete() {
    this.TravelerService.deleteTraveler(this.data.row.travelerId);
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
