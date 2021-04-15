import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminTravelerServiceService as AdminTravelerService } from 'src/app/services/admin-traveler-service/admin-traveler-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { TravelerData } from 'src/app/services/admin-traveler-service/traveler-data';
import { AdminTravelerFormComponent } from '../admin-traveler-form/admin-traveler-form.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteCheckTravelerComponent } from '../delete-checks/delete-check-traveler/delete-check-traveler.component';

@Component({
  selector: 'app-admin-traveler',
  templateUrl: './admin-traveler.component.html',
  styleUrls: ['./admin-traveler.component.css']
})
export class AdminTravelerComponent implements OnInit {

  ELEMENT_DATA!: TravelerData[];
  displayedColumns: string[] = ['travelerId', 'account', 'firstName', 'dob', 'middleName', 'lastName', 'gender', 'knownTravelerNumber', 'action'];
  dataSource = new MatTableDataSource<TravelerData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminTravelerService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllTraveler();
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public getAllTraveler() {
    let res = this.service.retrieveTraveler();
    res.subscribe(data => {
      this.dataSource.data = data as TravelerData[];
    });
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    let dialogRef = this.dialog.open(AdminTravelerFormComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTraveler();
    })

  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminTravelerFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTraveler();
    })    
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckTravelerComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTraveler();
    })
  }
}
