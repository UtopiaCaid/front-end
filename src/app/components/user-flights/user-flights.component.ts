import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import {UserTicketFormComponent} from 'src/app/components/user-ticket-form/user-ticket-form.component'

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.css']
})
export class UserFlightsComponent implements OnInit {

  ELEMENT_DATA!: UserFlightReports[];
  //ELEMENT_DATA!: FlightReports[];
  userTicket: UserTickets[];
  flightReports: FlightReports;
  displayedColumns: string[] = ['flightNo', 'departure', 'from', "to", 'arrival', 'status', 'price', 'action'];
  dataSource = new MatTableDataSource<UserFlightReports>(this.ELEMENT_DATA);
  ready = "Ready"
  constructor(
     private service: UserFlightService,
    private dialog: MatDialog,
  ) { 
    this.flightReports= {
      flightNo: 1,
      flightGate: "fakeValue",
      departure: "fakeValue",
      arrival: "fakeValue",
      status: "fakeValue",
  }
    this.userTicket = []
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
 
    this.getAllFlights();
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  public getAllFlights() {
    let res = this.service.retrieveFlights();
    res.subscribe(report => {
     
      let temp = report as UserFlightReports[]
      // console.log(temp)
      let result = temp.filter(function(x){
        return x.status !== "Completed"
      })
      this.dataSource.data = result
      
    });
  }

  public addTicket() {
  console.log("Added ticket")
  }
  public ticketMenu(row: UserFlightReports) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
  
    this.service.currentUserFlight.next(this.flightReports)
    this.service.setCurrentUserFlight(this.flightReports);

    let dialogRef = this.dialog.open(UserTicketFormComponent,{
      data: row
    });
    dialogRef.afterClosed().subscribe(() => {
      this.service.reSetCurrentUserFlight()
    })
    }

    public ticketMenu2() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
    
      this.service.currentUserFlight.next(this.flightReports)
      this.service.setCurrentUserFlight(this.flightReports);
  
      let dialogRef = this.dialog.open(UserTicketFormComponent);
      dialogRef.afterClosed().subscribe(() => {
        this.service.reSetCurrentUserFlight()
      })
      }

    public showRow(row: {}){
      console.log(row)
    }

    public canBuy(row: FlightReports): Boolean{
      ///Add more checks such as the plane having avaible seats
      if(row.status === "Ready")
      return true
      else
      return false

    }

}
