import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminTicketServiceService as AdminTicketService } from 'src/app/services/admin-ticket-service/admin-ticket-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketData } from 'src/app/entities';
import { AdminTicketFormComponent } from '../admin-ticket-form/admin-ticket-form.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteCheckTicketComponent } from '../delete-checks/delete-check-ticket/delete-check-ticket.component';

@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.css']
})
export class AdminTicketComponent implements OnInit {

  ELEMENT_DATA!: TicketData[];
  displayedColumns: string[] = ['ticketNo', 'flight', 'traveler', 'confirmationCode', 'ticketPrice', 'ticketClass', 'dateIssued', 'payment', 'update', 'delete'];
  dataSource = new MatTableDataSource<TicketData>(this.ELEMENT_DATA);

  constructor(
    private service: AdminTicketService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  ngOnInit(): void {
    this.getAllTickets();
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
      case 'ticketNo': {
        return item.ticketNo;
      }
      case 'flight': {
        return item.flight.flightNo;
      }
      case 'traveler': {
        return item.traveler.firstName;
      }
      case 'confirmationCode': {
        return item.confirmationCode;
      }
      case 'ticketPrice': {
        return item.ticketPrice;
      }
      case 'ticketClass': {
        return item.ticketClass;
      }
      case 'dateIssued': {
        return item.dateIssued;
      }
      case 'payment': {
        return item.payment.dateProcessed;
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
        row: row,
        errorUpdate: ''
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllTickets(), 1000);
    })
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminTicketFormComponent, {
      data: {
        errorUpdate: ''
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllTickets(), 1000);
    })
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckTicketComponent, {
      data: {
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => this.getAllTickets(), 1000);
    })
  }
}
