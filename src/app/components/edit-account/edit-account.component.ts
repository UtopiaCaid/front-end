import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile-service/user-profile.service';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

interface keyable {
  [key: string]: any  
}

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
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
    public userProfileService: UserProfileService,
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl("", [Validators.maxLength(100),Validators.minLength(2),Validators.pattern("[a-zA-Z ]*") ]),
      username: new FormControl("", [Validators.maxLength(30),Validators.minLength(5)]),
      email: new FormControl("", [Validators.maxLength(50),Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      phone: new FormControl("", [Validators.maxLength(10),Validators.minLength(7),Validators.pattern("^[0-9]*$")]),
      // phone: new FormControl("", [Validators.maxLength(10),Validators.minLength(7),Validators.pattern('[- +()0-9]+')]),
      newPassword: new FormControl("", [Validators.maxLength(100),Validators.minLength(3)]),
      password: new FormControl("", [Validators.maxLength(100),Validators.minLength(3),Validators.required]),
  });
  }

  ngOnInit(): void {
    this.authService.getLoggedInName.subscribe(name => this.username = String(name))
    this.authService.getLoggedInRoleType.subscribe(name => this.roleType = String(name))
    this.authService.getLoggedInEmail.subscribe(name => this.email = String(name))
    this.authService.getLoggedInFullName.subscribe(name => this.name = String(name))
    this.authService.getLoggedInPhoneNum.subscribe(name => this.phone = String(name))
    // this.authService.getCurrentAccount.subscribe(currentUser => this.username = String(currentUser.username))
    //this.authService.getLoggedInName.subscribe(name => this.username = String(name))
      if(this.authService.isLoggedIn){
      this.authService.getUserProfile()
      .subscribe(res => {
      this.currentUser = res;
      this.username= res.username;
      this.roleType= res.roleId.roleType;
      this.email= res.email;
      // console.log(this.currentUser)
      })
    }

    
  }

  ////Temp so stuff doesnt break for calls to a backend thats not done
  async onSubmitUserX(): Promise<void> {
    console.log("Edit backend not yet implmented.")
  }

  async onSubmitUser(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        // this.authService.router.navigate(['login']); 
     await this.userProfileService.editUser(this.form.value)
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
