import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  public wrongCred = false;
  public usernameTaken = false;


constructor(
  private formBuilder: FormBuilder,
  private authService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl("", [Validators.maxLength(30),Validators.minLength(5), Validators.required]),
      password: new FormControl("", [Validators.maxLength(50),Validators.minLength(3),Validators.required]),
  });
  
 }

ngOnInit(): void {
}


async onSubmit(): Promise<void> {
  this.loginInvalid = false;
  this.formSubmitAttempt = false;
  if (this.form.valid) {
    try {
      // this.authService.router.navigate(['login']); 
   await this.authService.registerAdmin(this.form.value)
   .subscribe((res: any) => {
   this.wrongCred= false;
   this.usernameTaken= false;
  //  console.log("Signup Res")
  //  console.log(res)
   if(res!=null)
    this.authService.logIn(this.form.value)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
      // console.log("Signup")
      // console.log(res)
     // this.authService.router.navigate(['login']); 
    this.authService.getUserProfile().subscribe((res) => {
      this.authService.currentUser = res;
      localStorage.setItem('current_roleType', res.roleId.roleType)
      localStorage.setItem('current_roleId', res.roleId.roleId)
      this.authService.getLoggedInName.next(res.username)
      this.authService.getLoggedInRoleType.next(res.roleId.roleType)
      this.authService.getLoggedInRoleId.next(res.roleId.roleId)
      this.authService.getCurrentAccount.next(res)
      this.authService.router.navigate(['home']); 
    })
  })
  else{
    console.error('Error in registering account')
    this.usernameTaken= true;
  }
  },
  error => {
    console.error('Error in registering account', error)
    console.error("Username is already taken.")
    this.usernameTaken= true;
    //this.wrongCred= true;
  }) 
     

    }
    catch (err) {
      console.log("Error in form")
      this.loginInvalid = true;
    }
  } else {
    console.log("Form was not accepted")
    this.formSubmitAttempt = true;
  }
  // this.loginInvalid = false;
  // this.formSubmitAttempt = false;
//   if (this.form.valid) {
//     if(true){
//     try {
//       // const username = this.form.get('username').value;
//       // const password = this.form.get('password').value;
//       // await this.authService.login(username, password);
//     } catch (err) {
//      // this.loginInvalid = true;
//     }
//   } else {
//    // this.formSubmitAttempt = true;
//   }
// }

}


}
