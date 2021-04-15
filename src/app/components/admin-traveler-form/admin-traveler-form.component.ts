import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminTravelerServiceService as AdminTravelerService } from 'src/app/services/admin-traveler-service/admin-traveler-service.service';
import { AdminAccountServiceService as AdminAccountService } from 'src/app/services/admin-account-service/admin-account-service.service';

/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

interface Account {
  accountNumber: number;
  role: object[];
  username: string;
  email: string;
  password: string;
  dateCreated: string;
}

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

  firstName = new FormControl('', [Validators.required]);
  dob = new FormControl(0, [Validators.required]);
  middleName = new FormControl('', [Validators.minLength(2), Validators.maxLength(45)]);
  lastName = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.minLength(1), Validators.maxLength(1)]);
  knownTravelerNumber = new FormControl(0, Validators.min(0));
  accountCheck = new FormControl(this.accounts, [Validators.required]);

  getErrorMessage() {
    return this.accountCheck.hasError('required') ? 'you must enter an account' :
      this.firstName.hasError('required') ? 'you must enter a first name' :
        this.dob.hasError('required') ? 'you must enter a date of birth' :
          this.lastName.hasError('required') ? 'you must enter a last name' :
            this.gender.hasError('required') ? 'you must enter a gender' : '';
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

  public formSubmit() {
    if (
      this.selectedAccount == undefined ||
      this.firstName.hasError('required') ||
      this.middleName.hasError('required') ||
      this.lastName.hasError('required') ||
      this.dob.hasError('required')
    ) {
      alert('Please insert the required fields')
    } else if (this.data) {
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
