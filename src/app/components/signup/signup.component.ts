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
      name: new FormControl("", [Validators.maxLength(40),Validators.minLength(2),Validators.pattern("[a-zA-Z ]*") ]),
      username: new FormControl("", [Validators.maxLength(30),Validators.minLength(5), Validators.required]),
      email: new FormControl("", [Validators.maxLength(50),Validators.email, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      phone: new FormControl("", [Validators.maxLength(10),Validators.minLength(7),Validators.pattern("^[0-9]*$")]),
      password: new FormControl("", [Validators.maxLength(100),Validators.minLength(3),Validators.required]),
  });
  
 }

ngOnInit(): void {
}


    onSubmit() {
  this.loginInvalid = false;
  this.formSubmitAttempt = false;
  if (this.form.valid) {
    try { 
    this.authService.registerUser(this.form.value)
   .subscribe((res: any) => {
   this.wrongCred= false;
   this.usernameTaken= false;
   if(res!=null)
    this.authService.logIn(this.form.value)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
    this.authService.getUserProfile().subscribe((res) => {
      this.authService.currentUser = res;
      localStorage.setItem('current_roleType', res.roleId.roleType)
      localStorage.setItem('current_roleId', res.roleId.roleId)
      this.authService.getLoggedInName.next(res.username)
      this.authService.getLoggedInRoleType.next(res.roleId.roleType)
      this.authService.getLoggedInRoleId.next(res.roleId.roleId)
      this.authService.getLoggedInEmail.next(res.email)
      this.authService.getCurrentAccount.next(res)
      this.authService.router.navigate(['home']); 
    })
  })
  else{
    console.error('Error in registering account')
    console.error("Username is already taken.")
    this.usernameTaken= true;
  }
  },
  error => {
    console.error('Error in registering account', error)
    console.error("Username is already taken.")
    this.usernameTaken= true;
  }) 
     

    }
    catch (err) {
      console.error("Error in form")
      this.loginInvalid = true;
    }
  } else {
    console.log("Form was not accepted")
    this.formSubmitAttempt = true;
  }

  ///Jury rig solution until dan's load in index.html no longer breaks catch's
  setTimeout(() => {
    ///wrong cred if still on page for 1.5 sec after signup attempt
    this.wrongCred= true;
    this.loginInvalid = true;
  }, 1500);
}


}
