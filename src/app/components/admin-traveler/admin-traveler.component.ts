import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminTravelerServiceService as AdminTravelerService } from 'src/app/services/admin-traveler-service/admin-traveler-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TravelerData } from 'src/app/entities';
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
  displayedColumns: string[] = ['account', 'firstName', 'dob', 'middleName', 'lastName', 'gender', 'knownTravelerNumber', 'update', 'delete'];
  dataSource = new MatTableDataSource<TravelerData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminTravelerService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  ngOnInit(): void {
    this.getAllTravelers();
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
      case 'account': {
        return item.account.username;
      }
      case 'firstName': {
        return item.firstName;
      }
      case 'dob': {
        return item.dob;
      }
      case 'middleName': {
        return item.middleName;
      }
      case 'lastName': {
        return item.lastName;
      }
      case 'gender': {
        return item.gender;
      }
      case 'knownTravelerNumber': {
        return item.knownTravelerNumber;
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

  
  public getAllTravelers() {
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
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllTravelers(), 1000);
    })
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminTravelerFormComponent, {
      data: {
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllTravelers(), 1000);
    })
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckTravelerComponent, {
      data: {
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllTravelers(), 1000);
    })
  }
}
