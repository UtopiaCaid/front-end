import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets'
import {UserFlightService} from 'src/app/services/user-flight-service/user-flight.service';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  currentUser: keyable={};
  currentCart: Array<UserTickets>;



  constructor(
    public authService: AuthenticationService,
    public userService: UserFlightService
  ) {
    this.currentCart = []
   
   }

  ngOnInit(): void {

    this.userService.currentCart.subscribe(name => this.currentCart = Object(name))
    this.authService.getCurrentAccount.subscribe(name => this.currentUser = Object(name))
    this.currentCart = JSON.parse(localStorage.getItem('currentCart') || "{}" )
   
    if(this.authService.isLoggedIn){
    this.authService.getUserProfile()
      .subscribe(res => {
        
        this.currentUser = res
      })
    }
  }
  

}
