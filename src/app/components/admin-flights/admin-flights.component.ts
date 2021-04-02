import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import { AdminFlightFormComponent } from '../admin-flight-form/admin-flight-form.component';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {

  ELEMENT_DATA!: FlightReports[];
  displayedColumns: string[] = ['flightNo', 'flightGate', 'departure', 'arrival', 'status', 'action'];
  dataSource = new MatTableDataSource<FlightReports>(this.ELEMENT_DATA);

  constructor(
    private service: AdminFlightService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllFlights();
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


    this.dialog.open(AdminFlightFormComponent, {
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
    this.dialog.open(AdminFlightFormComponent);
  }

}
