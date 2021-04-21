import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import {UserTicketFormComponent} from 'src/app/components/user-ticket-form/user-ticket-form.component'
import { MatSelectChange } from '@angular/material/select';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';



interface Airport {
  airportCode: number;
  city: string;
  airportName: string;
  status: string;
}

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
  airports!: Airport[];
  selectedAirportDep!: {};
  selectedAirportArr!: {};
  selectedStartDate = new Date();
  selectedEndDate!: Date;
  form: FormGroup;
  panelOpenState = true;
  unfilteredFlights!: UserFlightReports[];
  filterYet: Boolean;

  currentDate = new Date();
 
  constructor(
    private formBuilder: FormBuilder,
     private service: UserFlightService,
    private dialog: MatDialog,
  ) { 
 
    this.getAllAirports();
    this.filterYet = false
    this.form = this.formBuilder.group({
      startDate: ['',this.currentDate],
      endDate: ['', this.selectedStartDate]
  });
    

    this.flightReports= {
      flightNo: 1,
      flightGate: "fakeValue",
      departure: "fakeValue",
      airportDeparture: [], 
      airportArrival: [],
      arrival: "fakeValue",
      status: "fakeValue",
  }
    this.userTicket = []
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllAirports();
    this.getAllFlights();
    this.populate();
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
      this.unfilteredFlights = result
    });
  }

  public getAllAirports() {
    let res = this.service.retrieveAirports();
    res.subscribe(airport => this.airports = airport as Airport[]);
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

    public populate() {
      if (this.dataSource.data) {

      }
    }

    public startAirChange( event: MatSelectChange){
      this.selectedAirportDep = event.value;
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

    public endAirChange( event: MatSelectChange){
      this.selectedAirportArr = event.value;
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

    public startDateChange( event: MatDatepickerInputEvent<Date>){
      this.selectedStartDate = event.value||new Date("0000-00-00");
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

    public endDateChange( event:MatDatepickerInputEvent<Date>){
      this.selectedEndDate = event.value||new Date("0000-00-00");
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

    public onSubmit(){
      
      this.filterFlights();
    }

    public filterFlights(){
      this.filterYet= true;
      this.dataSource.data = this.unfilteredFlights
      if(this.selectedAirportDep){
        let flights1 = this.dataSource.data as UserFlightReports[]
        var depPort = this.selectedAirportDep
        let result = flights1.filter(function(x){
          if(JSON.stringify(x.airportDeparture)===JSON.stringify(depPort))
          return x.airportDeparture
          else 
          return false
        })
        this.dataSource.data = result
      }
      if(this.selectedAirportArr){
        let flights1 = this.dataSource.data as UserFlightReports[]
        var arrPort = this.selectedAirportArr
        let result = flights1.filter(function(x){
          if(JSON.stringify(x.airportArrival)===JSON.stringify(arrPort))
          return x.airportArrival
          else 
          return false
        })
        this.dataSource.data = result
      }
      if(this.selectedStartDate){
        let flights1 = this.dataSource.data as UserFlightReports[]
        let startDate = new Date(formatDate(this.selectedStartDate, 'yyyy-MM-dd', 'en_US'))
        let result = flights1.filter(function(x){
          let arvDate = new Date(x.departure)
          if(+arvDate >= +startDate)
          return x.departure
          else 
          return false
        })
        this.dataSource.data = result
      }
      if(this.selectedEndDate){
        
        let flights1 = this.dataSource.data as UserFlightReports[]
        let endDate = new Date(formatDate(this.selectedEndDate, 'yyyy-MM-dd', 'en_US'))
        let result = flights1.filter(function(x){
          let arvDate = new Date(x.arrival)
          if(+arvDate <= +endDate)
          return x.arrival
          else 
          return false
        })
        this.dataSource.data = result
      }
   

    }

}
