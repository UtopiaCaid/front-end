import { Component, OnInit } from '@angular/core';
import {Account} from "../../services/account";
import { AuthenticationService } from '../../services/authentication.service';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // currentUser: Account = {
  //   id: "null",
  //   username: "null",
  //   email: "null",
  //   password: "null"
  // };
  // currentUser: Object={
  //      id: "null",
  //   username: "null",
  //   email: "null"
  // };
  currentUser: keyable={};
  

  constructor(
    // private account: Account,
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
      if(this.authService.isLoggedIn){
      this.authService.getUserProfile()
      .subscribe(res => {
      this.currentUser = res;
      // console.log(this.currentUser)
      })
    }
 
  
  }

}
