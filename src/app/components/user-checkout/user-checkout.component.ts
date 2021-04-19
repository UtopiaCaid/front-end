import { Component, OnInit } from '@angular/core';
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import { MatTableDataSource } from '@angular/material/table';
import {UserFlightReports} from "src/app/services/user-flight-service/user-flight-reports"


@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.css']
})
export class UserCheckoutComponent implements OnInit {

  currentCart: Array<UserTickets>;
  userTicket1: UserTickets;
  ELEMENT_DATA!: UserTickets[];
  displayedColumns: string[] = ['name','flightNo', 'flightClass', 'flightGate', 'departure', 'arrival', 'price', 'action'];
  dataSource = new MatTableDataSource<UserTickets>(this.ELEMENT_DATA);
 

  constructor(
    public userService : UserFlightService
  ) { 
    this.currentCart = []
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

    this.userService.currentCart.subscribe(name => this.currentCart = Object(name))
    this.currentCart = JSON.parse(localStorage.getItem('currentCart') || "{}" )
    this.userService.currentCart.subscribe(report => this.dataSource.data = report as UserTickets[])
    this.dataSource.data = this.currentCart
    // console.log("Current Cart")
    // console.log(this.currentCart)
  }
  getCart(){
    this.userService.currentCart.subscribe(name => this.currentCart = Object(name))
    this.currentCart = JSON.parse(localStorage.getItem('currentCart') || "{}" )
    this.userService.currentCart.subscribe(report => this.dataSource.data = report as UserTickets[])
    this.dataSource.data = this.currentCart
  }

  payNow(){
    console.log("Paynow button")
    ///probably takes you to a module just for paying
  }

  clearCart(){
    this.userService.reSetCurrentCart();
  }

  deleteTicket(row: UserTickets ){
    ///add confirmation model?
    this.userService.removeFromCurrentCart(row);
    this.getCart();
  }

}
