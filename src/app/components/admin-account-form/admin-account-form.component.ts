import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminAccountServiceService as AdminAccountService } from 'src/app/services/admin-account-service/admin-account-service.service';

/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-admin-account-form',
  templateUrl: './admin-account-form.component.html',
  styleUrls: ['./admin-account-form.component.css']
})
export class AdminAccountFormComponent implements OnInit {

  ngOnInit(): void {
    this.populate();
  }

  constructor(
    private AccountService: AdminAccountService,
    public dialogRef: MatDialogRef<AdminAccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  username = new FormControl("", [Validators.maxLength(30),Validators.minLength(5), Validators.required]);
  password = new FormControl("", [Validators.maxLength(50),Validators.minLength(3),Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  dateCreated = new FormControl('', [Validators.required]);


  getErrorMessage() {
    return this.username.hasError('required') ? 'you must enter a username' :
      this.email.hasError('required') ? 'you must enter an email' :
        this.password.hasError('required') ? 'you must enter a password' : '';
  }

  public populate() {
    if (this.data) {
      console.log('An account is edited not created')
      console.log(this.data.row);
      this.username.setValue(this.data.row.username);
      this.email.setValue(this.data.row.email);
      this.password.setValue(this.data.row.password);
      this.dateCreated.setValue(this.data.row.dateCreated);
    }
  }

  public formSubmit() {
    if (
      this.username.hasError('required') ||
      this.email.hasError('required') ||
      this.password.hasError('required') ||
      this.dateCreated.hasError('required')
    ) {
      alert('Please insert the required fields')
    } else if (this.data.row != undefined) {
      this.AccountService.updateAccount(
        this.data.row.accountNumber,
        this.username.value,
        this.email.value,
        this.password.value,
        this.dateCreated.value,
      )
      this.dialogRef.close();
    } else {
      this.AccountService.insertAccount(
        this.username.value,
        this.email.value,
        this.password.value,
        this.dateCreated.value,
      );
      this.dialogRef.close();
    }
  }
}
