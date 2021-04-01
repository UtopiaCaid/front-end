import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginMini',
  templateUrl: './loginMini.component.html',
  styleUrls: ['./loginMini.component.css']
})
export class LoginMiniComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
    
  ){
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
      // password: ['', Validators.required]
  });
  
 }

  ngOnInit(): void {
  }
  async onSubmit() {
    this.authService.logIn(this.form.value)
  }

}
