import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminProfileService } from '../../services/admin-profile-service/admin-profile.service';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-admin-edit-account',
  templateUrl: './admin-edit-account.component.html',
  styleUrls: ['./admin-edit-account.component.css']
})
export class AdminEditAccountComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  public wrongCred = false;
  public usernameTaken = false;
  public passwordWrong = false;
  currentUser: keyable={};
  username: String="";
  roleType: String="";
  email: String="";
  phone: String="";
  name: String="";

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public adminProfileService: AdminProfileService
  ) { 
    this.form = this.formBuilder.group({
      username: new FormControl("", [Validators.maxLength(30),Validators.minLength(5)]),
      newPassword: new FormControl("", [Validators.maxLength(100),Validators.minLength(3)]),
      password: new FormControl("", [Validators.maxLength(100),Validators.minLength(3),Validators.required]),
  });
  }

  ngOnInit(): void {
    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
    this.authService.getLoggedInRoleType.subscribe(name => this.roleType = String(name))
    if(this.authService.isLoggedIn){
      this.authService.getUserProfile()
      .subscribe(res => {
      this.currentUser = res;
      this.username= res.username;
      this.roleType= res.roleId.roleType;
      })
    }

    
  }


  async onSubmitAdmin(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        // this.authService.router.navigate(['login']); 
     await this.adminProfileService.editAdmin(this.form.value)
     .subscribe((res: any) => {
     this.wrongCred= false;
     this.usernameTaken= false;
     this.passwordWrong = false;
     if(res!=null)
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser = res;
        this.authService.getLoggedInName.next(res.username)
        this.authService.router.navigate(['home']); 
      })
    
    else{
      console.log('Error in editing account')
      this.usernameTaken= true;
      this.passwordWrong = true;
    }
    },
    error => {
      console.log('Error in editing account', error)
      this.wrongCred= true;
      this.passwordWrong = true;
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
 
  
  }

}
