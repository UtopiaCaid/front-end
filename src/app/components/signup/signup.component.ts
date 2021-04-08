import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

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
  public usernameTaken = false;


constructor(
  private formBuilder: FormBuilder,
  private authService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      //name: ['', (Validators.maxLength(100), Validators.pattern(/^-?(0|[1-9]\d*)?$/))],
      name: new FormControl("", [Validators.maxLength(100),Validators.minLength(2),Validators.pattern("[a-zA-Z ]*") ]),
      username: new FormControl("", [Validators.maxLength(30),Validators.minLength(5), Validators.required]),
      email: new FormControl("", [Validators.maxLength(50),Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      password: new FormControl("", [Validators.maxLength(100),Validators.minLength(3),Validators.required]),
      // username: ['', Validators.required],
      // email: ['', Validators.email],
      // password: ['', Validators.required]
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
      // this.authService.router.navigate(['login']); 
   await this.authService.registerUser(this.form.value)
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
      this.authService.getLoggedInName.next(res.username)
      this.authService.router.navigate(['home']); 
    })
  })
  else{
    console.log('Error in registering account')
    this.usernameTaken= true;
  }
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
