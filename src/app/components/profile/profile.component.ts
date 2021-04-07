import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: keyable={};
  username: String="";
  roleType: String="";
  email: String="";

  constructor(
    public authService: AuthenticationService
    ) {
      
    //   if(this.authService.isLoggedIn){
    //   setTimeout(() => {  
    //     console.log("World!"); 
    //     // console.log(this.authService.currentUser);
    //     // console.log(this.authService.getCurrentUser());
    //     // this.currentUser=this.authService.currentUser;
        
    //   }, 100);
    //   // this.authService.getUserProfile().subscribe(res => {
    //   //   this.currentUser = res.msg;
    //   //   // console.log("HomeUser")
    //   //   // console.log(this.currentUser)
    //   //   // console.log(this.authService.getUserProfile())
    //   // })
    //   // console.log("Auth Token")
    //   // console.log(this.authService.getToken())
     
    // // this.authService.getUser().subscribe(res => {
    // //   this.currentUser = res;
    // // })
    // // this.authService.getCurrentUser()
    // // this.currentUser=this.authService.currentUser;
    // // console.log("currentUser")
    // // console.log(this.currentUser)
    // // console.log(this.authService.currentUser)
    // }
  }


  

  ngOnInit(): void {

    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
    this.authService.getLoggedInRoleType.subscribe(name => this.roleType = String(name))
    this.authService.getLoggedInEmail.subscribe(name => this.email = String(name))
    //this.authService.getCurrentAccount.subscribe(currentUser => this.username = String(currentUser.username))
    //this.authService.getLoggedInName.subscribe(name => this.username = String(name))
      if(this.authService.isLoggedIn){
      this.authService.getUserProfile()
      .subscribe(res => {
      this.currentUser = res;
      this.username= res.username;
      this.roleType= res.roleId.roleType;
      this.email= res.email;
      // console.log(this.currentUser)
      })
    }
 
  
  }

}
