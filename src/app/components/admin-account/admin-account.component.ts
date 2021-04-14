import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAccountServiceService as AdminAccountService } from 'src/app/services/admin-account-service/admin-account-service.service';
import { AccountData } from 'src/app/services/admin-account-service/account-data';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminAccountFormComponent } from '../admin-account-form/admin-account-form.component';
import { DeleteCheckAccountComponent } from '../delete-checks/delete-check-account/delete-check-account.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {

  ELEMENT_DATA!: AccountData[];
  displayedColumns: string[] = ['accountNumber', 'roleType', 'username', 'email', 'password', 'dateCreated'];
  dataSource = new MatTableDataSource<AccountData>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private service: AdminAccountService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getAllAccount();
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public getAllAccount() {
    let res = this.service.retrieveAccounts();
    res.subscribe(data => this.dataSource.data = data as AccountData[]);
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    this.dialog.open(AdminAccountFormComponent, {
      data: {
        row: row,
        update: true
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
        update: false
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
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllAccount();
    })
  }
}
