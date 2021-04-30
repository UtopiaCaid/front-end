import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAircraftTypeServiceService as AdminAircraftTypeService } from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service';
import { AircraftTypeData } from 'src/app/services/admin-aircraftType-service/aircraftType-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminAircraftTypeFormComponent } from '../admin-aircraftType-form/admin-aircraftType-form.component';
import { DeleteCheckAircraftTypeComponent } from '../delete-checks/delete-check-aircraftType/delete-check-aircraftType.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-aircraftType',
  templateUrl: './admin-aircraftType.component.html',
  styleUrls: ['./admin-aircraftType.component.css']
})
export class AdminAircraftTypeComponent implements OnInit {

  ELEMENT_DATA!: AircraftTypeData[];
  displayedColumns: string[] = ['aircraftTypeId', 'aircraftTypeName', 'seatMaximum', 'manufacturer', 'update', 'delete' ];
  dataSource = new MatTableDataSource<AircraftTypeData>(this.ELEMENT_DATA);

  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  constructor(
    private service: AdminAircraftTypeService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAllAircraftType();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLocaleLowerCase();
  }
  public getAllAircraftType() {
    let res = this.service.retrieveAircraftTypes();
    res.subscribe(data => this.dataSource.data = data as AircraftTypeData[]);
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(AdminAircraftTypeFormComponent, {
      data: {
        row: row,
        update: true,
        errorUpdate: ''
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllAircraftType(), 1000);
    })
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminAircraftTypeFormComponent, {
      data: {
        update: false,
        errorUpdate: '',
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllAircraftType(), 1000);
    })
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckAircraftTypeComponent, {
      data: {
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllAircraftType(), 1000);
    })
  }
}
