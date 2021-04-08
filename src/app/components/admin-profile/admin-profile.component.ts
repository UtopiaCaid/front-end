import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  currentUser: keyable={};
  username: String="";
  roleType: String="";

  constructor(
    public authService: AuthenticationService
    ) {
      
   
  }


  

  ngOnInit(): void {

    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
    this.authService.getLoggedInRoleType.subscribe(name => this.roleType = String(name))
    if(this.authService.isLoggedIn){
      this.authService.getUserProfile()
      .subscribe(res => {
      this.currentUser = res;
      this.username= res.username;
      this.roleType= res.roleId.roleType;
      })
    }
 
  
  }

}
