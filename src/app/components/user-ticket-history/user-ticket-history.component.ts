import { Component, OnInit } from '@angular/core';
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"
import { MatTableDataSource } from '@angular/material/table';
import {Account} from 'src/app/services/auth-service/account';


@Component({
  selector: 'app-user-ticket-history',
  templateUrl: './user-ticket-history.component.html',
  styleUrls: ['./user-ticket-history.component.css']
})
export class UserTicketHistoryComponent implements OnInit {

  userHTickets: Array<UserTickets>;
  userTicket1: UserTickets;
  ELEMENT_DATA!: UserTickets[];
  displayedColumns: string[] = ['name','flightNo', 'flightGate', 'departure', 'arrival', 'price', 'action'];
  dataSource = new MatTableDataSource<UserTickets>(this.ELEMENT_DATA);
  currentUser: Account;
  hasFlightHistroy: Boolean;
  gotInfo : Boolean

  constructor(
    public userService : UserFlightService,
    public authService : AuthenticationService
  ) {
    this.hasFlightHistroy = true;
    this.gotInfo = false;
    this.currentUser =    {
    username: "null",
    email: "null",
    password: "null",
    name: "null",
    phone: "null",
    dateCreated: "null",
    accountNumber: "null",
    roleId: 
    {
        roleId: "null",
        roleType: "null",
    }
  }
    this.userHTickets = []
    this.userTicket1 = {
      flightNo: 0,
      flightGate: "null",
      departure: "null",
      arrival: "null",
      price: "null",
      accountNumber: "null",
      username: "null",
      name: "null",
      email: "null",
      phone: "null",
      flightClass: "null",
    }
   }

   ngOnInit(): void {
    this.authService.getCurrentAccount.subscribe(name => this.currentUser = Object(name))
    if(this.authService.isLoggedIn){
    this.authService.getUserProfile()
      .subscribe(res => {
        // console.log(res)
        this.currentUser = res
        // console.log(this.userService.retrieveAccountTicketHistory(this.currentUser.accountNumber))
        // console.log(this.currentUser.accountNumber )
        //this.userService.retrieveAccountTicketHistory("27")
        //this.userService.retrieveAccountTicketHistory(this.currentUser.accountNumber)
       console.log("User retrived is currently hard coded as '1'.")
       this.userService.retrieveAccountTicketHistory("1")
        .subscribe((res) => {
          // console.log(res)
          this.gotInfo= true;
          if(res.length>0)
          this.hasFlightHistroy = true;
          else
          this.hasFlightHistroy = false;
         
          for(const num in res){
            
            this.userTicket1=res[num].flight
            this.userTicket1.price = res[num].ticketPrice
            this.userTicket1.name =  res[num].traveler.firstName+" "+res[num].traveler.lastName
            this.userHTickets.push(this.userTicket1)
            
          }
          this.dataSource.data = this.userHTickets
        })
     
     
      })

    }

    var accountNum = this.currentUser.accountNumber;
    // console.log("User retrived is currently hard coded as '1'.")
    // this.userService.retrieveAccountTicketHistory("1")
   
  }

  payNow(){
    console.log("Paynow button")
    ///probably takes you to a module just for paying
  }

  clearCart(){
    this.userService.reSetCurrentCart();
  }

  deleteTicket(){
    console.log("Implement Ticket History later")
  }

}
