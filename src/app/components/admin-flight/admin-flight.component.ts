import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { FlightReports, AirportReports, Paginator} from 'src/app/entities';
import { AdminFlightFormComponent } from '../admin-flight-form/admin-flight-form.component';
import { DeleteCheckFlightsComponent } from '../delete-checks/delete-check-flights/delete-check-flights.component';
import {delay} from 'rxjs/operators';
import {LoadingService} from 'src/app/services/loading-service';
import { MatCheckbox } from '@angular/material/checkbox';

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
  loading: boolean = false;
  sortField: string = "flightNo"; // default flight number

  constructor(
    private service: AdminFlightService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
  ) { }

  /* checkbox children */
  @ViewChildren("checkboxes")
  checkboxes !: QueryList<MatCheckbox>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  ngOnInit(): void {
    this.getFlightCount();
    this.listenToLoading();
    this.getPaginatedFlights();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
  }

  /* loading function */
  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  ngAfterViewInit() {
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

public listenBox(field: string) {
  this.sortField = field;
  this.uncheckAll();
}

public uncheckAll() {
  this.checkboxes.forEach((element) => {
    element.id != this.sortField ? (element.checked = false, element.color = 'accent') 
    : (element.color == 'accent' || element.color == 'warn' 
        ? (element.color = 'primary', element.checked = true, this.paginatorData.sort = 'ASC', this.paginatorData.field =   this.sortField)
        : (element.color = 'warn', element.checked = true, this.paginatorData.sort = 'DESC', this.paginatorData.field =   this.sortField)
      )
  });

  this.getPaginatedFlights();
}
public sortBox(field : string) {
  this.sortField = field;
  this.paginatorData.sort = this.sortField;
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
