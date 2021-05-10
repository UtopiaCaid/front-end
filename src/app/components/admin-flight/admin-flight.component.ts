import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { FlightReports, AirportReports, Paginator} from 'src/app/entities';
import { AdminFlightFormComponent } from '../admin-flight-form/admin-flight-form.component';
import { DeleteCheckFlightsComponent } from '../delete-checks/delete-check-flights/delete-check-flights.component';

@Component({
  selector: 'app-admin-flight',
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.css']
})
export class AdminFlightComponent implements OnInit {

  ELEMENT_DATA!: FlightReports[];
  airportTemp!: AirportReports[];
  totalFlights!: number;
  displayedColumns: string[] = ['flightNo', 'flightGate', 'airportDeparture', 'airportArrival', 'departure', 'arrival', 'status', 'update', 'delete'];
  dataSource = new MatTableDataSource<FlightReports>(this.ELEMENT_DATA);
  paginatorData: Paginator = { pageIndex: 0, pageSize: 5, field: 'flightNo', sort: 'asc'}; // default values

  constructor(
    private service: AdminFlightService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  ngOnInit(): void {
    this.getPaginatedFlights();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  ngAfterViewInit() {
    this.getFlightCount();
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

/* triggers on sort change */
public getSortData(event: any) {
  console.log("sort swap");
  console.log(event);
  this.paginatorData.field = event.active;
  this.paginatorData.sort = event.direction;
  this.getPaginatedFlights();
}

/* triggers on pagination change */
public getPaginatorData(event: any) {
  console.log("pagination page swap");
  this.paginatorData.pageIndex = event.pageIndex;
  this.paginatorData.pageSize = event.pageSize;
  this.getPaginatedFlights();
}

/* triggers on search input */
public doFilter = (event: Event) => {
  this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLocaleLowerCase();
}

  public getAllFlights() {
    let res = this.service.retrieveFlights();
    res.subscribe(report => this.dataSource.data = report as FlightReports[]);
  }

  public getFlightCount() {
    let res = this.service.retrieveFlightCount();
    res.subscribe(flights => this.paginator.length = flights as number);
  }

  public getPaginatedFlights() {
    let res = this.service.getPagination(
      this.paginatorData.field, this.paginatorData.sort, 
      this.paginatorData.pageIndex, this.paginatorData.pageSize);
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
      setTimeout(() => this.getPaginatedFlights(), 1000);
      
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
      setTimeout(() => this.getPaginatedFlights(), 1000);
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
      setTimeout(() => this.getPaginatedFlights(), 1000);
    })
  }
}
