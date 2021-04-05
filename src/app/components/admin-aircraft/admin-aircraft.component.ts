import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {AdminAircraftServiceService as AdminAircraftService} from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AircraftData } from 'src/app/services/admin-aircraft-service/aircraft-data';
import { AdminAircraftFormComponent } from '../admin-aircraft-form/admin-aircraft-form.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

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
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllAircraft();
  }

  public getAllAircraft() {
    let res = this.service.retrieveAircraft();
    res.subscribe(data => 
      {
        this.dataSource.data = data as AircraftData[];
        this.changeDetectorRefs.detectChanges(); // doesn't work yet
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
}
