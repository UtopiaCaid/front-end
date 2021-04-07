import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services/auth-service/authentication.service';
import { MatMenuTrigger } from '@angular/material/menu';

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
  roleType: string="";
  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    
    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
    this.authService.getLoggedInRoleType.subscribe(name => this.roleType = String(name))
    if(this.authService.isLoggedIn){
    this.authService.getUserProfile()
      .subscribe(res => {
        this.username = res.username
        this.roleType = res.roleId.roleType
      })
    }
    
  }

  logout() {
    this.currentUser = {}
    this.username=""
    this.roleType=""
    this.authService.doLogout()
  }
  

  leave() {
    console.log("leave");
    
    (setTimeout(function(){
      console.log("leaveTimer");
      
      //menuTrigger.closeMenu()
    }, 2000))
}

}
