import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
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
  
     onSubmit() {
    this.authService.logIn(this.form.value)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
     
      this.wrongCred = false;
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
        //this.authService.router.navigate(['home']); 
        //this.reload();  
      })
    },
    error => {
      console.error('Wrong credentials', error)
      this.wrongCred = true;
    }) 

    ///used to refresh incase user logs in while on home page
    if(this.authService.isLoggedIn)
       setTimeout(() => {  
        this.reload();
      }, 130);
   
  }


  reload(){
    location.reload();
  }

}
