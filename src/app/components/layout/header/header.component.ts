import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services/auth-service/authentication.service';
import { MatMenuTrigger } from '@angular/material/menu';
import * as jwtDecode from "jwt-decode";

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
  staleToken: Boolean=false;
  isMobile: Boolean=false;
  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 991;
    window.onresize = () => this.isMobile = window.innerWidth <= 991;
    this.staleToken=false;
    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
    this.authService.getLoggedInRoleType.subscribe(name => this.roleType = String(name))
    if(this.authService.isLoggedIn){
    this.authService.getUserProfile()
      .subscribe(res => {
        
        this.username = res.username
        this.roleType = res.roleId.roleType
        this.staleToken=false;
      })
    }
    

    ///For logout when token exspires
    if(this.authService.isLoggedIn)
    {
    var decode= this.authService.getDecodedAccessToken();
    if (decode.exp < Date.now() / 1000) {
      this.logout();
    }
  }

 
    ///For when unable to reach db
     if((this.authService.isLoggedIn) && (((this.username=="")&& (this.roleType==""))))
    {
      setTimeout(() => {
        ///If unable to reach the db after 2 seconds on reload will logout user
        if((this.authService.isLoggedIn) && (((this.username=="")&& (this.roleType==""))))
        this.logout();

      }, 2000);
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
    }, 2000))
}

}
