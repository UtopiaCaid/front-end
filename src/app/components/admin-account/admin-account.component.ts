import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAccountServiceService as AdminAccountService } from 'src/app/services/admin-account-service/admin-account-service.service';
import { AccountData, RoleTypeData} from 'src/app/entities';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminAccountFormComponent } from '../admin-account-form/admin-account-form.component';
import { DeleteCheckAccountComponent } from '../delete-checks/delete-check-account/delete-check-account.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  ELEMENT_DATA!: AccountData[];
  displayedColumns: string[] = ['roleType', 'username', 'email', 'dateCreated', 'action'];
  dataSource = new MatTableDataSource<AccountData>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  constructor(
    private service: AdminAccountService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAllAccount();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }  
  }
  public parseRoleType(role : RoleTypeData) {
    switch(role.roleId) {
      case(1):
        return "User";
      case(2):
        return "Admin";
      case(3):
        return "Deactivated";
      default:
        return "other";
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
      case 'roleType': {
        return item.role.roleType;
      }
      case 'username': {
        return item.username;
      }
      case 'email': {
        return item.email;
      }
      case 'dateCreated': {
        return item.dateCreated;
      }
      default: {
        return "null";
      }
      };
    }
  }
  public getAllAccount() {
    let res = this.service.retrieveAccounts();
    res.subscribe(data => this.dataSource.data = data as AccountData[]);
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLocaleLowerCase();
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    this.dialog.open(AdminAccountFormComponent, {
      data: {
        row: row,
        update: true,
        errorUpdate: '',

      },
    });

  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AdminAccountFormComponent, {
      data: {
        update: false,
        errorUpdate: '',
      }
    });
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckAccountComponent, {
      data: {
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllAccount();
    })
  }
}
