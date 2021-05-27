import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth-service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  
    form: FormGroup;
    public loginInvalid = false;
    private formSubmitAttempt = false;
    public wrongCred = false;


  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthenticationService
    ) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    
   }

  ngOnInit(): void {
  }


   onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    
    if (this.form.valid) {
      try {
      this.authService.logIn(this.form.value)
     .subscribe((res: any) => {
       this.wrongCred= false;
      localStorage.setItem('access_token', res.token)
     this.wrongCred= false;
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser = res;
        localStorage.setItem('current_roleType', res.roleId.roleType)
        localStorage.setItem('current_roleId', res.roleId.roleId)
        localStorage.setItem('current_accountNum', res.accountNumber)
        this.authService.getLoggedInName.next(res.username)
        this.authService.getLoggedInRoleType.next(res.roleId.roleType)
        this.authService.getLoggedInRoleId.next(res.roleId.roleId)
        this.authService.getLoggedInEmail.next(res.email)
        this.authService.getCurrentAccount.next(res)
      })
    },
    error => {
      console.log("Error here")
      console.error('Wrong credentials', error)
      this.wrongCred= true;
    },
    )
       
      }
      catch (err) {
        console.error("Error in form")
        this.loginInvalid = true;
      }
    } else {
      ///shouldent be able to reach this code since btn would be disabled
      console.log("Form was not accepted")
      this.formSubmitAttempt = true;
    } 

    ///Jury rig solution until dan's load in index.html no longer breaks catch's
    setTimeout(() => {
      ///wrong cred if still on page for 1 sec after login attempt
      this.wrongCred= true;

    }, 1000);

  }




 


}
