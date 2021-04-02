import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAircraftTypeServiceService } from 'src/app/services/admin-aircraftType-service/admin-aircraftType-service.service';
import { AircraftTypeData } from 'src/app/services/admin-aircraftType-service/aircraftType-data';

@Component({
  selector: 'app-admin-aircraftType',
  templateUrl: './admin-aircraftType.component.html',
  styleUrls: ['./admin-aircraftType.component.css']
})
export class AdminAircraftTypeComponent implements OnInit {

  ELEMENT_DATA!: AircraftTypeData[];
  displayedColumns: string[] = ['aircraftTypeId', 'aircraftTypeName', 'seatMaximum', 'manufacturer'];
  dataSource = new MatTableDataSource<AircraftTypeData>(this.ELEMENT_DATA);

  constructor(private service: AdminAircraftTypeServiceService) { }

  ngOnInit(): void {
    this.getAllAircraftType();
  }

  public getAllAircraftType() {
    let res = this.service.retrieveAircraftType();
    res.subscribe(data => this.dataSource.data = data as AircraftTypeData[]);
  }

}
