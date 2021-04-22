import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { FlightReports, AirportReports } from 'src/app/entities';
import { AdminFlightFormComponent } from '../admin-flight-form/admin-flight-form.component';
import { DeleteCheckFlightsComponent } from '../delete-checks/delete-check-flights/delete-check-flights.component';
import { parseLocalDateTime } from 'src/app/services/datetime-parser';

@Component({
  selector: 'app-admin-flight',
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.css']
})
export class AdminFlightComponent implements OnInit {

  ELEMENT_DATA!: FlightReports[];
  airportTemp!: AirportReports[];
  displayedColumns: string[] = ['flightNo', 'flightGate', 'airportDeparture', 'airportArrival', 'departure', 'arrival', 'status', 'update', 'delete'];
  dataSource = new MatTableDataSource<FlightReports>(this.ELEMENT_DATA);

  constructor(
    private service: AdminFlightService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  ngOnInit(): void {
    this.getAllFlights();
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
    case 'flightNo': {
      return item.flightNo;
    }
    case 'flightGate': {
      return item.flightGate;
    }
    case 'departure': {
      return item.departure;
    }
    case 'arrival': {
      return item.arrival;
    }
    case 'airportDeparture': {
      return item.airportDeparture.airportName;
    }
    case 'airportArrival': {
      return item.airportArrival.airportName;
    }
    case 'status': {
      return item.status;
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

public parseRecords(flights: FlightReports[]) {
  flights.forEach(
    curr => curr = this.parseFlightRecords(curr)
  )
  return flights
}

public parseFlightRecords(flight : FlightReports) {
  flight.arrival = parseLocalDateTime(flight.arrival);
  flight.departure = parseLocalDateTime(flight.departure);
  return flight;
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
        row: row,
        errorUpdate: '',
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
    let dialogRef = this.dialog.open(AdminFlightFormComponent, {
      data: {
        errorUpdate : '',
      }
    });
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
        row: row,
        errorUpdate: '',
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllFlights();
    })
  }

}
