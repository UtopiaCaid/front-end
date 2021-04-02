import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

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
    private authService: AuthenticationService
    ) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
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
     await this.authService.logIn(this.form.value)
     .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
      // console.log("Token");
      // console.log(res.token);
    //  console.log("RES")
    //  console.log(res)
     this.wrongCred= false;
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
        
        //location.reload();   
        
      })
    },
    error => {
      console.log('Wrong credentials', error)
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


