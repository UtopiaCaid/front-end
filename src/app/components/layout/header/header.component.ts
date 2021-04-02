import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';


interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: keyable={};
  username: string="";
  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    
    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
      // this.authService.getUserProfile()
      // .subscribe(res => {
      //   this.username = res.username
      // console.log("InitRan")
      // })
    
  }

  logout() {
    this.currentUser = {}
    this.username=""
    this.authService.doLogout()
  }

}
