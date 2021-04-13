import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.css']
})
export class UserFlightsComponent implements OnInit {

  ELEMENT_DATA!: FlightReports[];
  displayedColumns: string[] = ['flightNo', 'flightGate', 'departure', 'arrival', 'status', 'action'];
  dataSource = new MatTableDataSource<FlightReports>(this.ELEMENT_DATA);

  constructor(
     private service: UserFlightService,
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

}
