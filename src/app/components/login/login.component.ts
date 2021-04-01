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
  // public loginInvalid: boolean;
  // private formSubmitAttempt: boolean;
  // private returnUrl: string
  // form: any = {
  //   username: null,
  //   password: null
  // };
  // isLoggedIn = false;
  // isLoginFailed = false;
  // errorMessage = '';
  // roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
    ) {
      this.form = this.formBuilder.group({
        username: [''],
        password: ['']
        // password: ['', Validators.required]
    });
    
   }

  ngOnInit(): void {
  //   this.form = this.formBuilder.group({
  //     username: [''],
  //     password: ['']
  //     // password: ['', Validators.required]
  // });
  }


  async onSubmit() {
    this.authService.logIn(this.form.value)
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


