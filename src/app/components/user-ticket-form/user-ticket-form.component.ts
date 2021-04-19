import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Inject } from '@angular/core';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-user-ticket-form',
  templateUrl: './user-ticket-form.component.html',
  styleUrls: ['./user-ticket-form.component.css']
})

export class UserTicketFormComponent implements OnInit {
  
  form: FormGroup;
  currentUser: keyable={};
  public wrongCred = false;
  // userTicket: UserTickets[];
  userTicket: keyable={};
  flightReports: FlightReports;
  userFlightReports: UserFlightReports;
  //flightReports: UserFlightReports;
  // flightReports: keyable={};
  currentPrice: Number;
  selectedFlightClass!: {};
  public userTicket2: UserTickets;
  public userTicket3: UserTickets;

  currentCart: Array<UserTickets>;
  
  constructor(
    // public userTicket2: UserTickets,
    public dialogRef: MatDialogRef<UserTicketFormComponent>,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public userService: UserFlightService,
    //public dialogRef: MatDialogRef<DialogComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    //@Inject(MAT_DIALOG_DATA) public data: FlightReports
    @Inject(MAT_DIALOG_DATA) public data: UserFlightReports
  ) { 
    let datetemp = new Date("0000-00-00")
    this.currentCart = []
    this.currentPrice = 0
    this.flightReports= {
      flightNo: 0,
      flightGate: "null",
      airportDeparture: [],
      airportArrival: [],
      departure: "null",
      arrival: "null",
      status: "null",
  }
    this.userTicket2 = {
      flightNo: this.flightReports.flightNo,
      flightGate: this.flightReports.flightGate,
      departure: this.flightReports.departure,
      arrival: this.flightReports.arrival,
      price: this.currentPrice.toString(),
      accountNumber: this.currentUser.accountNumber,
      username: this.currentUser.username,
      name: this.currentUser.name,
      email:this.currentUser.email,
      phone:this.currentUser.phone,
    }
   this.userFlightReports= {
      flightNo: 0,
      flightGate: "null",
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
      aircraft: {
          aircraftId: 0,
          seatCount: 0,
          firstClassCount: 0,
          secondClassCount: 0,
          thirdClassCount: 0,
          aircraftType: {
              aircraftTypeId: 0,
              aircraftTypeName: "null",
              seatMaximum: 0,
              manufacturer: "null",
          },
          aircraftStatus: "null",
      },
      basePrice: 0,
      departure: datetemp,
      arrival: datetemp,
      status: "null",
  }
    this.userTicket3 = this.userTicket2;
  
    this.userTicket = []
    // this.flightReports = []
    
    this.form = this.formBuilder.group({
      name: new FormControl("", [Validators.maxLength(40), Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-Z ]*") ]),
      username: new FormControl("", [Validators.maxLength(30),Validators.minLength(5)]),
      email: new FormControl("", [Validators.maxLength(50),Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      phone: new FormControl("", [Validators.maxLength(10),Validators.minLength(7),Validators.pattern("^[0-9]*$")]),
      flightClass: new FormControl(""),
  });
  }

  ngOnInit(): void {
    
    this.userFlightReports = this.data
    //this.flightReports = this.data
    this.currentPrice = this.data.basePrice
    this.userService.currentCart.subscribe(name => this.currentCart = Object(name))
    // this.userService.currentUserTicket.subscribe(res => 
    //   {
    //     console.log("User Ticket")
    //     console.log(res)
    //     this.userTicket3 = Object(res)})
    //this.userService.currentUserFlight.subscribe(name => this.flightReports = Object(name))
 
    this.authService.getCurrentAccount.subscribe(name => this.currentUser = Object(name))
    if(this.authService.isLoggedIn){
      this.authService.getUserProfile()
        .subscribe(res => {
          
          this.currentUser = res
        })
      }

  
      /////To fake until backend is working
      // this.flightReports.flightNo = 1
      // this.flightReports.flightGate = "fakeValue"
      // this.flightReports.departure=  "fakeValue"
      // this.flightReports.arrival = "fakeValue"
      // this.flightReports.status=  "fakeValue"

  }

  async onSubmit(): Promise<void> {
  //   this.userTicket = {
  //     flightNo: 1,
  //     flightGate: this.flightReports.flightNo,
  //     departure: this.flightReports.departure,
  //     arrival: this.flightReports.arrival,
  //     status: this.flightReports.status,
  //     price: this.currentPrice,
  //     accountNumber: this.currentUser.accountNumber,
  //     username: this.currentUser.username,
  //     name: this.currentUser.name,
  //     email:this.currentUser.email,
  //     phone:this.currentUser.phone,
  // }

  var tempName = ""
 

  tempName = this.form.get('name')?.value
  
  this.userTicket2 = {
    flightNo: this.userFlightReports.flightNo,
    flightGate: this.userFlightReports.flightGate,
    departure: this.userFlightReports.departure.toString(),
    arrival: this.userFlightReports.arrival.toString(),
    price: this.currentPrice.toString(),
    accountNumber: this.currentUser.accountNumber,
    username: this.currentUser.username,
    name: this.form.get('name')?.value || this.currentUser.name,
    email: this.form.get('email')?.value || this.currentUser.email,
    phone: this.form.get('phone')?.value || this.currentUser.phone,
  }
  
    var ticket = this.userTicket2;
    
 
    this.userService.setCurrentUserTicket(this.userTicket2);
    this.userService.setCurrentCart(this.userTicket2);
    
   
 
  
    this.dialogRef.close();

  }

  public initTicket(){
    this.userTicket2 = {
      flightNo: this.userFlightReports.flightNo,
      flightGate: this.userFlightReports.flightGate,
      departure: this.userFlightReports.departure.toString(),
      arrival: this.userFlightReports.arrival.toString(),
      price: this.userFlightReports.basePrice.toString(),
      accountNumber: this.currentUser.accountNumber,
      username: this.currentUser.username,
      name: this.currentUser.name,
      email:this.currentUser.email,
      phone:this.currentUser.phone,}
  }

}
