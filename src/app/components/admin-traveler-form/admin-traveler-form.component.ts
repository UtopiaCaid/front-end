import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminTravelerServiceService as AdminTravelerService } from 'src/app/services/admin-traveler-service/admin-traveler-service.service';
import { AdminAccountServiceService as AdminAccountService } from 'src/app/services/admin-account-service/admin-account-service.service';
import { AccountData as Account} from 'src/app/entities';

/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-admin-traveler-form',
  templateUrl: './admin-traveler-form.component.html',
  styleUrls: ['./admin-traveler-form.component.css']
})
export class AdminTravelerFormComponent implements OnInit {

  ngOnInit(): void {
    this.getAllUserAccounts();
    this.populate();
  }

  constructor(
    private TravelerService: AdminTravelerService,
    private AccountService: AdminAccountService,
    public dialogRef: MatDialogRef<AdminTravelerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public getAllUserAccounts() {
    let res = this.AccountService.retrieveUserAccounts();
    res.subscribe(account => this.accounts = account as Account[]);
  }

  selectedAccount!: {};
  accounts!: Account[];

  compareFunctionAccount(o1: any, o2: any) {
    return o1 && o2 ? o1.accountId === o2.accountId : o1 === o2;
  }

  firstName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]);
  dob = new FormControl(0, [Validators.required]);
  middleName = new FormControl('', [Validators.minLength(1), Validators.maxLength(45)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(45)]);
  gender = new FormControl('', [Validators.required, Validators.maxLength(1)]);
  knownTravelerNumber = new FormControl(0, [Validators.min(0)]);
  accountCheck = new FormControl(this.accounts, [Validators.required]);

  getErrorMessage(number : number) {
    switch(number) {
      case 1:
        return this.firstName.hasError('required') ? 'you must enter a first name' : 
        this.firstName.hasError('minlength') ? 'you must enter a first name' :
        this.firstName.hasError('maxlength') ? 'first name length limit exceeded' : '';
      case 2:
        return this.middleName.hasError('maxlength') ? 'middle name length limit exceeded' : '';
      case 3:
        return this.lastName.hasError('required') ? 'you must enter a last name' :
        this.lastName.hasError('minlength') ? 'you must enter a last name' :
        this.lastName.hasError('maxlength') ? 'last name length limit exceeded' : '';
      case 4:
        return this.gender.hasError('maxlength') ? 'gender must be 1 character'  :
        this.gender.hasError('required') ? 'you must enter a gender' : '';
      case 5:
        return this.dob.hasError('required') ? 'you must enter a date of birth' : ''
      case 6:
        return this.accountCheck.hasError('required') ? 'you must enter an account' : '';
      case 7:
        return this.knownTravelerNumber.hasError('min') ? 'Known Traveler Number must be Non-Negative' : '';  
      default:
        return 'form error';
    }
}

  public populate() {
    if (this.data) {
      this.firstName.setValue(this.data.row.firstName);
      this.dob.setValue(this.data.row.dob);
      this.middleName.setValue(this.data.row.middleName);
      this.lastName.setValue(this.data.row.lastName);
      this.knownTravelerNumber.setValue(this.data.row.knownTravelerNumber);
      this.gender.setValue(this.data.row.gender);
      this.selectedAccount = this.data.row.account;
      console.log(this.selectedAccount);

    }
  }

  public getSubmitMessage() {
    return this.data.errorUpdate;
  }

  public submitReady() {
    return this.data.errorUpdate == '' ? true : false;
  }
  
  public formSubmit() {
    if (
      this.selectedAccount == undefined ||
      this.firstName.hasError('required') ||
      this.middleName.hasError('required') ||
      this.lastName.hasError('required') ||
      this.dob.hasError('required') ||
      this.gender.hasError('required')
    ) {
      this.data.errorUpdate =('Please insert the required fields')
    } else if (
      this.firstName.hasError('minlength') ||
      this.firstName.hasError('maxlength') ||
      this.middleName.hasError('maxlength') ||
      this.lastName.hasError('minlength') ||
      this.lastName.hasError('maxlength')  ||
      this.gender.hasError('maxlength') ||
      this.knownTravelerNumber.hasError('min')
    ) {
      this.data.errorUpdate =('Invalid Field Value(s)'); 
    }else if (this.data.row != undefined) {
      this.TravelerService.updateTraveler(
        this.data.row.travelerId,
        this.selectedAccount,
        this.firstName.value,
        this.dob.value,
        this.middleName.value,
        this.lastName.value,
        this.gender.value,
        this.knownTravelerNumber.value
      )
      this.dialogRef.close();
    } else {
      this.TravelerService.insertTraveler(
        this.selectedAccount,
        this.firstName.value,
        this.dob.value,
        this.middleName.value,
        this.lastName.value,
        this.gender.value,
        this.knownTravelerNumber.value
      );
      this.dialogRef.close();
    }
  }
}
