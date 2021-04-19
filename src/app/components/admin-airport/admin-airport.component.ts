import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAirportServiceService as AdminAirportService } from 'src/app/services/admin-airport-service/admin-airport-service.service';
import { AirportReports } from 'src/app/services/admin-airport-service/airport-reports';
import { AdminAirportFormComponent } from '../admin-airport-form/admin-airport-form.component';
import { DeleteCheckAirportComponent } from '../delete-checks/delete-check-airport/delete-check-airport.component';

@Component({
  selector: 'app-admin-airport',
  templateUrl: './admin-airport.component.html',
  styleUrls: ['./admin-airport.component.css']
})
export class AdminAirportComponent implements OnInit {

  ELEMENT_DATA!: AirportReports[];
  displayedColumns: string[] = ['airportId', 'airportCode', 'city', 'airportName',
    'status', 'action']
  dataSource = new MatTableDataSource<AirportReports>(this.ELEMENT_DATA);

  constructor(
    private service: AdminAirportService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllAirports();
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public getAllAirports() {
    let res = this.service.retrieveAirports();
    res.subscribe(report => this.dataSource.data = report as AirportReports[]);
  }

  public onEdit(row: {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(AdminAirportFormComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllAirports();
    })
  }


  public onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(AdminAirportFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllAirports();
    })
  }

  public deleteCheck(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(DeleteCheckAirportComponent, {
      data: {
        row: row
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllAirports();
    })
  }
}
