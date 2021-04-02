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
  public wrongCred = false;
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
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
     
      this.wrongCred = false;
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser = res;
        this.authService.getLoggedInName.next(res.username)
        this.authService.router.navigate(['home']); 
        this.reload();  
      })
    },
    error => {
      console.log('Wrong credentials', error)
      this.wrongCred = true;
    }) 

    if(this.authService.isLoggedIn)
       setTimeout(() => {  
        this.reload();
      }, 130);
      // const secondFunction = async () => {
      //   const result = await this.authService.logIn(this.form.value)
      //   location.reload();
      // }
      // secondFunction;
   
  }


  reload(){
    location.reload();
  }

}
