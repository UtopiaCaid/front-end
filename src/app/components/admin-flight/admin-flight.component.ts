import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import { AdminFlightFormComponent } from '../admin-flight-form/admin-flight-form.component';
import { DeleteCheckFlightsComponent } from '../delete-checks/delete-check-flights/delete-check-flights.component';

@Component({
  selector: 'app-admin-flight',
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.css']
})
export class AdminFlightComponent implements OnInit {

  ELEMENT_DATA!: FlightReports[];
  displayedColumns: string[] = ['flightNo', 'flightGate', 'departure', 'arrival', 'status', 'action'];
  dataSource = new MatTableDataSource<FlightReports>(this.ELEMENT_DATA);

  constructor(
    private service: AdminFlightService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllFlights();
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }



  public getAllFlights() {
    let res = this.service.retrieveFlights();
    res.subscribe(report => this.dataSource.data = report as FlightReports[]);
  }

  public onEdit(row: {}) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";


    let dialogRef = this.dialog.open(AdminFlightFormComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllFlights();
    })
  }

  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminFlightFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllFlights();
    })
  }

  public deleteCheck(row: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckFlightsComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllFlights();
    })
  }

}
