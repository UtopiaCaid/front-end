import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form: FormGroup;
  // public loginInvalid: boolean;
  // private formSubmitAttempt: boolean;
  // private returnUrl: string

  constructor() { }

  ngOnInit(): void {
  }


  async onSubmit() {
    // this.loginInvalid = false;
    // this.formSubmitAttempt = false;
    // if (this.form.valid) {
      if(true){
      try {
        // const username = this.form.get('username').value;
        // const password = this.form.get('password').value;
        // await this.authService.login(username, password);
      } catch (err) {
       // this.loginInvalid = true;
      }
    } else {
     // this.formSubmitAttempt = true;
    }
  }


}


