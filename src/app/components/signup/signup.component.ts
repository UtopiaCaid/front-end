import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  public wrongCred = false;


constructor(
  private formBuilder: FormBuilder,
  private authService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
      // password: ['', Validators.required]
  });
  
 }

ngOnInit(): void {
}


async onSubmit(): Promise<void> {
  this.loginInvalid = false;
  this.formSubmitAttempt = false;
  if (this.form.valid) {
    try {
   
   await this.authService.registerUser(this.form.value)
   .subscribe((res: any) => {
   this.wrongCred= false;
    this.authService.logIn(this.form.value)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
      console.log("Signup")
      console.log(res)
     // this.authService.router.navigate(['login']); 
    this.authService.getUserProfile().subscribe((res) => {
      this.authService.currentUser = res;
      this.authService.getLoggedInName.next(res.username)
      this.authService.router.navigate(['home']); 
    })
  })
  },
  error => {
    console.log('Error in registering account', error)
    this.wrongCred= true;
  }) 
     

    }
    catch (err) {
      console.log("Error in form")
      this.loginInvalid = true;
    }
  } else {
    console.log("Form was accepted")
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
