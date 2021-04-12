import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

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



  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.authService.getCurrentAccount.subscribe(name => this.currentUser = Object(name))

    if(this.authService.isLoggedIn){
    this.authService.getUserProfile()
      .subscribe(res => {
        
        this.currentUser = res
      })
    }
  }
  

}
