import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {AdminAircraftServiceService as AdminAircraftService} from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { AircraftData } from 'src/app/services/admin-aircraft-service/aircraft-data';
import { AdminAircraftFormComponent } from '../admin-aircraft-form/admin-aircraft-form.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteCheckAircraftComponent } from '../delete-checks/delete-check-aircraft/delete-check-aircraft.component'; 

@Component({
  selector: 'app-admin-aircraft',
  templateUrl: './admin-aircraft.component.html',
  styleUrls: ['./admin-aircraft.component.css']
})
export class AdminAircraftComponent implements OnInit {

  ELEMENT_DATA!: AircraftData[];
  displayedColumns: string[] = ['aircraftId', 'aircraftType', 'seatCount', 'firstClassCount', 'secondClassCount', 'thirdClassCount', 'status', 'action'];
  dataSource = new MatTableDataSource<AircraftData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminAircraftService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllAircraft();
  }

  public getAllAircraft() {
    let res = this.service.retrieveAircraft();
    res.subscribe(data => 
      {
        this.dataSource.data = data as AircraftData[];
      });
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    this.dialog.open(AdminAircraftFormComponent, {
      data: {
        row: row
      }
    });

  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AdminAircraftFormComponent);
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckAircraftComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllAircraft();
    })
  }
}
