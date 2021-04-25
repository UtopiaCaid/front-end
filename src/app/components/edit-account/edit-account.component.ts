import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile-service/user-profile.service';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
import { Account } from '../../services/auth-service/account'


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
  form2!: FormGroup;
  form3!: FormGroup;
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
  accountNum!: number;
  account!:Account;

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
      oldPassword: new FormControl("", [Validators.maxLength(100),Validators.minLength(3),Validators.required]),
      accountNumber: Number,
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
      this.accountNum = res.accountNumber;
      //this.form.setValue({accountNumber: this.accountNum});
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
 
    var tempAccount = {
      username:this.username || "",
      password: this.form.get('password')?.value || "",
      accountNumber: "",
      name: "",
      email:"",
      phone:"",
      dateCreated:"",
      roleId: {
        roleId : "",
        roleType: "",
    }
    }
  
    this.form2 = this.formBuilder.group({
      username: [this.username],
      password: [this.form.get('oldPassword')?.value || ""]
  });
  this.form3 = this.formBuilder.group({
    username: [this.form.get('username')?.value || this.username],
    password: [this.form.get('oldPassword')?.value || ""]
});


      this.userNameUnqiue();
  

   
  }


  userNameUnqiue(){
    this.form.controls['username'].setErrors(null)
    this.usernameTaken = false;
     if((this.form.get('username')?.value|| this.username) !== this.username ){
      console.log(this.userProfileService.uniqueUserName(this.form3.value))
      this.userProfileService.uniqueUserName(this.form3.value)
      .subscribe((res: any) => {
        if(res)
        this.updateCon()
        else{
          console.error("Someone already has that username")
          this.usernameTaken = true;
          this.form.controls['username'].setErrors({'nameTaken': true})
        }
      })
   
    }
    else {
      this.updateCon()
    }

  }


  updateCon(){

    if (this.form.valid) {
      try {
         this.authService.logIn(this.form2.value)
        .subscribe((res2: any) => {
      this.userProfileService.updateUser(this.form.value, this.accountNum)
     .subscribe((res: any) => {
     this.wrongCred= false;
     this.usernameTaken= false;
     this.passwordWrong = false;

     this.authService.doLogout();

     this.authService.logIn(this.form3.value)
     .subscribe((res: any) => {
      localStorage.setItem('access_token', res.token)
     this.wrongCred= false;
      this.authService.getUserProfile()
      .subscribe((res) => {
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
      console.error('Wrong credentials', error)
      this.wrongCred= true;
    }) 
       
      
      
  
    },
    error => {
      console.log('Error in editing account', error)
      this.wrongCred= true;
      this.passwordWrong = true;
    }) 
  },
  error => {
    console.error('Error in editing account', error)
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
