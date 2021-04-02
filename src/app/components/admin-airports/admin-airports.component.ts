import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';
import { AirportReports } from 'src/app/services/admin-airport-service/airport-reports';

@Component({
  selector: 'app-admin-airports',
  templateUrl: './admin-airports.component.html',
  styleUrls: ['./admin-airports.component.css']
})
export class AdminAirportsComponent implements OnInit {

  ELEMENT_DATA!: AirportReports[];
  displayedColumns: string[] = ['airportId', 'airportCode', 'city', 'airportName',
    'status']
  dataSource = new MatTableDataSource<AirportReports>(this.ELEMENT_DATA);

  constructor(private service: AdminAirportService) { }

  ngOnInit(): void {
    this.getAllAirports();
  }

  public getAllAirports() {
    let res = this.service.retrieveAirports();
    res.subscribe(report => this.dataSource.data = report as AirportReports[]);
  }

}
