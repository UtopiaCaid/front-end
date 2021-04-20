import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminTicketServiceService as AdminTicketService } from 'src/app/services/admin-ticket-service/admin-ticket-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { TicketData } from 'src/app/services/admin-ticket-service/ticket-data';
import { AdminTicketFormComponent } from '../admin-ticket-form/admin-ticket-form.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteCheckTicketComponent } from '../delete-checks/delete-check-ticket/delete-check-ticket.component';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.css']
})
export class AdminTicketComponent implements OnInit {

  ELEMENT_DATA!: TicketData[];
  displayedColumns: string[] = ['ticketNo', 'flight', 'traveler', 'confirmationCode', 'ticketPrice', 'ticketClass', 'dateIssued', 'payment', 'action'];
  dataSource = new MatTableDataSource<TicketData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminTicketService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllTickets();
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public getAllTickets() {
    let res = this.service.retrieveTickets();
    res.subscribe(data => {
      this.dataSource.data = data as TicketData[];
    });
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    let dialogRef = this.dialog.open(AdminTicketFormComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTickets();
    })
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminTicketFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTickets();
    })
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckTicketComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllTickets();
    })
  }
}
