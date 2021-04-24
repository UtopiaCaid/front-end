import { Component, OnInit } from '@angular/core';
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import { MatTableDataSource } from '@angular/material/table';
import {Account} from 'src/app/services/auth-service/account';
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"


@Component({
  selector: 'app-user-flight-history',
  templateUrl: './user-flight-history.component.html',
  styleUrls: ['./user-flight-history.component.css']
})
export class UserFlightHistoryComponent implements OnInit {

  userHTickets: Array<UserTickets>;
  userTicket1: UserTickets;
  // ELEMENT_DATA!: UserTickets[];
  ELEMENT_DATA!: UserFlightReports[];
  displayedColumns: string[] = ['flightNo', 'flightGate', 'departure', "from", "to", 'arrival', 'price', 'status', 'action'];
  dataSource = new MatTableDataSource<UserFlightReports>(this.ELEMENT_DATA);
  currentUser: Account;
  hasFlightHistroy: Boolean;
  loading: Boolean;

  constructor(
    public userService : UserFlightService,
    public authService : AuthenticationService
  ) {
    this.hasFlightHistroy = true;
    this.loading = true;
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
        roleTYpe: "null",
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
        
        this.currentUser = res
        
        var accountNum = this.currentUser.accountNumber;
       
        console.log("User retrived is currently hard coded as '1'")
        this.userService.retrieveAccountFlightHistory("1")
        // this.userService.retrieveAccountFlightHistory(accountNum)
        .subscribe((res) => {
          if(res.length>0)
          this.hasFlightHistroy = true;
          else
          this.hasFlightHistroy = false;
    
          this.dataSource.data = res
          this.loading = false;
        })
      })

    }
 
  }

 

  flightOptions(){
    console.log("Implement Options later")
  }

}
