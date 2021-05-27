import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAircraftServiceService as AdminAircraftService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { AircraftData } from 'src/app/entities';
import { AircraftTypeData } from 'src/app/entities';import { AdminAircraftFormComponent } from '../admin-aircraft-form/admin-aircraft-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteCheckAircraftComponent } from '../delete-checks/delete-check-aircraft/delete-check-aircraft.component';

@Component({
  selector: 'app-admin-aircraft',
  templateUrl: './admin-aircraft.component.html',
  styleUrls: ['./admin-aircraft.component.css']
})
export class AdminAircraftComponent implements OnInit {

  ELEMENT_DATA!: AircraftData[];
  displayedColumns: string[] = ['aircraftType', 'seatCount', 'firstClassCount', 'secondClassCount', 'thirdClassCount', 'status', 'update', 'delete'];
  dataSource = new MatTableDataSource<AircraftData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminAircraftService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  ngOnInit(): void {
    this.getAllAircraft();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
      case 'aircraftType': {
        return item.aircraftType.aircraftTypeName;
      }
      case 'seatCount': {
        return item.seatCount;
      }
      case 'firstClassCount': {
        return item.firstClassCount;
      }
      case 'secondClassCount': {
        return item.secondClassCount;
      }
      case 'thirdClassCount': {
        return item.thirdClassCount;
      }
      case 'aircraftStatus': {
        return item.aircraftStatus;
      }
      default: {
        return "null";
      }
      };
    }
  }
  
  public doFilter = (event: Event) => {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLocaleLowerCase();
  }

  public getAllAircraft() {
    let res = this.service.retrieveAircraft();
    res.subscribe(data => {
      this.dataSource.data = data as AircraftData[];
    });
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    let dialogRef = this.dialog.open(AdminAircraftFormComponent, {
      data: {
        row: row,
        errorUpdate: '',
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllAircraft(), 1000);
    })
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(AdminAircraftFormComponent, {
      data: {
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllAircraft(), 1000);
    })
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckAircraftComponent, {
      data: {
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllAircraft(), 1000);
    })
  }
}
