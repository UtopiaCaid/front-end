import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import {UserTicketFormComponent} from 'src/app/components/user-ticket-form/user-ticket-form.component'
import { MatSelectChange } from '@angular/material/select';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Variable } from '@angular/compiler/src/render3/r3_ast';



interface Airport {
  airportCode: number;
  city: string;
  airportName: string;
  status: string;
}

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed, void => expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserFlightsComponent implements OnInit {

  ELEMENT_DATA!: UserFlightReports[];
  userTicket: UserTickets[];
  flightReports: FlightReports;
 
  displayedColumns: string[] = ['flightNo', 'departure', 'from', "to", 'arrival', 'status', 'basePrice', 'action'];
  dataSource = new MatTableDataSource<UserFlightReports>(this.ELEMENT_DATA);
  ready = "Ready"
  airports!: Airport[];
  selectedAirportDep!: {};
  selectedAirportArr!: {};
  selectedStartDate = new Date();
  selectedEndDate!: Date;
  nullDate!: Date;
  nullAirport!: {};
  form: FormGroup;
  panelOpenState = true;
  unfilteredFlights!: UserFlightReports[];
  filterYet: Boolean;
  currentDate = new Date();
  
  ///Flight search stuff
  flightSearchColumns: string[]= ['flightSearchNo',  'departure', 'from', "to", 'arrival', 'numOfFlights','action'];
  flightSearchColumns2: string[]= ['flightSearchNo2',  'departure2', 'from2', "to2", 'arrival2', 'numOfFlights2','action2'];
  roundNoLayColumns: string[]= ['flightWay','numOfFlights', 'selectFlight']
  roundLayColumns: string[]= ['flightWay','numOfTrips', 'selectFlight']
  isFlightSearch: Boolean =false;
  flightSearchType!: string;
  expandedElement!: UserFlightReports[] | null;
  expandedElement2!: UserFlightReports[][] | null;
  ELEMENT_DATA2!: UserFlightReports[][];
  dataSource2 = new  MatTableDataSource<UserFlightReports[]>(this.ELEMENT_DATA2);
  ELEMENT_DATA3!: UserFlightReports[][][];
  dataSource3 = new  MatTableDataSource<UserFlightReports[][]>(this.ELEMENT_DATA3);
  isLoading : Boolean = true
  currentColumn: string[] =this.flightSearchColumns
  roundNoInt!: UserFlightReports | null
  roundNoRe!: UserFlightReports | null
  isRoundNoValid: Boolean=false;
  
 
  constructor(
    private formBuilder: FormBuilder,
     private service: UserFlightService,
    private dialog: MatDialog,
  ) { 
 
    this.getAllAirports();
    this.filterYet = false
    this.form = this.formBuilder.group({
      startDate: [this.currentDate,this.currentDate],
      endDate: ['', this.selectedStartDate],
      startingAirports: [''],
      endingAirports: [''],
      layoverType: [''],
  });
    

    this.flightReports= {
      flightNo: 1,
      flightGate: "fakeValue",
      departure: "fakeValue",
      airportDeparture: {
        airportId: 0,
        airportCode: 0,
        city: "null",
        airportName: "null",
        status: "null",
    },
    airportArrival: {
        airportId: 0,
        airportCode: 0,
        city: "null",
        airportName: "null",
        status: "null",
    },
      arrival: "fakeValue",
      status: "fakeValue",
  }
    this.userTicket = []
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ///Allows the tables to sort by columns on click
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllAirports();
    this.getAllFlights();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    
   
  }

  //Called intitaly and whenever the filter is cleared. Gets the standard flight table
  public getAllFlights() {
    let res = this.service.retrieveFlights();
    res.subscribe(report => {
     
      let temp = report as UserFlightReports[]
      let result = temp.filter(function(x){
        return x.status !== "Completed"
      })
      this.unfilteredFlights = result
      this.dataSource.data = result

      ///Filters out flights that depart before current date
      let flights1 = this.dataSource.data as UserFlightReports[]
      let startDate = new Date(formatDate(this.selectedStartDate, 'yyyy-MM-dd', 'en_US'))
      
      let result2 = flights1.filter(function(x){
        let arvDate = new Date(x.departure)
        if(+arvDate >= +startDate)
        return x.departure
        else 
        return false
      })


      this.dataSource.data = result2
    });
  }

  //used to populate airports
  public getAllAirports() {
    let res = this.service.retrieveAirports();
    res.subscribe(airport => this.airports = airport as Airport[]);
  }

  public addTicket() {
  // console.log("Added ticket")
  }
  ///Called when user clicks 'add ticket'. Opens dialog to buy ticket of selected flight
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

    ///Slightly More advance ticket menu not currently used
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


///Triggers whenever the starting airport is changed
    public startAirChange( event: MatSelectChange){
      this.selectedAirportDep = event.value;
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

    ///Triggers whenever the end airport is changed
    public endAirChange( event: MatSelectChange){
      this.selectedAirportArr = event.value;
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

     ///Triggers whenever the start date is changed
    public startDateChange( event: MatDatepickerInputEvent<Date>){
      this.selectedStartDate = event.value||new Date("0000-00-00");
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }

    ///Triggers whenever the end date is changed
    public endDateChange( event:MatDatepickerInputEvent<Date>){
      this.selectedEndDate = event.value||new Date("0000-00-00");
      if(this.form.valid&&((+this.selectedStartDate<= +this.selectedEndDate)
      ||(this.selectedEndDate==undefined)))
      this.filterFlights();
    }


    ////When the user clicks the 'clear filter' button
    public onSubmit(){
      this.isFlightSearch = false;
      this.flightSearchType = "";
      this.isLoading = true;
      this.isRoundNoValid = false
      this.selectedEndDate= this.nullDate
      this.selectedStartDate= this.currentDate
      this.selectedAirportArr =this.nullAirport
      this.selectedAirportDep =this.nullAirport
      this.form.reset();
      this.form = this.formBuilder.group({
        startDate: [this.currentDate,this.currentDate],
        endDate: ['', this.selectedStartDate],
        startingAirports: [''],
        endingAirports: [''],
        layoverType: [''],
    });

      this.filterFlights();
    }

    ///Called whenever the flights in the flight table need to be filtered/updated
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
    

    ///Shows a diffrent table based on what type of flight is selected
    public layoverType( event: MatSelectChange){
      this.isFlightSearch = true;
      this.isLoading = true;
      this.isRoundNoValid = false
      //console.log(this.form.get("layoverType")?.value||"Nothing")
   
   
      switch(event.value){

      case "OneWayNonLayover": {
        this.flightSearchType = "OneWayNonLayover"
        this.isFlightSearch= false;
        this.currentColumn = this.displayedColumns
      this.service.retrieveOneWayNonLayover(0,0, "temp", "temp")
      .subscribe((res) => {
        // console.log("OneWayNonLayover:")
        // console.log(res)
       
        this.dataSource.data=res;
        this.isLoading = false;
      })
      break;
      }
      case "OneWayAllLayover":{
        this.flightSearchType = "OneWayAllLayover"
        this.currentColumn = this.flightSearchColumns
        this.service.retrieveOneWayAllLayover(0,0, "temp", "temp")
        .subscribe((res) => {
          // console.log("OneWayAllLayover:")
          // console.log(res)
          this.dataSource2.data = res;
          this.isLoading = false;
        })
        break;
      }
        case "RoundTripNoLayover":{
          this.flightSearchType = "RoundTripNoLayover"
          this.currentColumn = this.roundNoLayColumns
          this.service.retrieveRoundTripNoLayover(0,0, "temp", "temp","t", "t")
          .subscribe((res) => {
            // console.log("RoundTripNoLayover:")
            // console.log(res)
            this.dataSource2.data = res;
            this.expandedElement = res[0]
            this.isLoading = false;
          })
          break;
        }
          case "RoundTripLayovers":{
            this.flightSearchType = "RoundTripLayovers"
            this.currentColumn = this.roundNoLayColumns
            this.service.retrieveRoundTripLayovers(0,0, "temp", "temp","t", "t")
            .subscribe((res) => {
              // console.log("RoundTripLayovers:")
              // console.log(res)
              this.isLoading = false;
               this.dataSource3.data = res;
            })
            break;
          }
          default:{
            this.isFlightSearch = false;
            this.onSubmit();
            // console.log('nothing selected');
           
          }
    }
  }

  ///This is called whenever the subflight selection in 'round-trip-no-layover' is changed
  public roundNoSelect( event: MatSelectChange, element: UserFlightReports[], i : number){
    // console.log("Select Value")
    // console.log(event.value)
    // console.log(i)
    if(event.value){
      this.expandedElement= null;
      if(i==0){
        this.roundNoInt= event.value
        if(!this.roundNoRe)
        this.expandedElement= this.dataSource2.data[1]
      }
      if(i==1)
        this.roundNoRe= event.value

        if(this.roundNoRe && this.roundNoInt)
        this.isRoundNoValid = true
    }
    else{
      this.expandedElement = element;
      if(i==0)
       this.roundNoInt= null
      if(i==1)
       this.roundNoRe= null

       if(!this.roundNoRe || !this.roundNoInt)
       this.isRoundNoValid = false

    }
    }


}
