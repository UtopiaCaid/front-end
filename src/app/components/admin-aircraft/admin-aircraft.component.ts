import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAircraftServiceService } from 'src/app/services/admin-aircraft-service/admin-aircraft-service.service';
import { AircraftData } from 'src/app/services/admin-aircraft-service/aircraft-data';

@Component({
  selector: 'app-admin-aircraft',
  templateUrl: './admin-aircraft.component.html',
  styleUrls: ['./admin-aircraft.component.css']
})
export class AdminAircraftComponent implements OnInit {

  ELEMENT_DATA!: AircraftData[];
  displayedColumns: string[] = ['aircraftId', 'aircraftType', 'seatCount', 'firstClassCount', 'secondClassCount', 'thirdClassCount', 'status'];
  dataSource = new MatTableDataSource<AircraftData>(this.ELEMENT_DATA);

  constructor(private service: AdminAircraftServiceService) { }

  ngOnInit(): void {
    this.getAllAircraft();
  }

  public getAllAircraft() {
    let res = this.service.retrieveAircraft();
    res.subscribe(data => this.dataSource.data = data as AircraftData[]);
  }

}
