import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminFlightServiceService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';



@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {

  ELEMENT_DATA!: FlightReports[];
  displayedColumns: string[] = ['flightNo', 'flightGate', 'departure', 'arrival', 'status'];
  dataSource = new MatTableDataSource<FlightReports>(this.ELEMENT_DATA);

  constructor(private service: AdminFlightServiceService) { }

  ngOnInit(): void {
    this.getAllFlights();
  }

  public getAllFlights() {
    let res = this.service.retrieveFlights();
    res.subscribe(report => this.dataSource.data = report as FlightReports[]);
  }

}
