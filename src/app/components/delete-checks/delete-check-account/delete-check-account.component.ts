import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminAccountServiceService as AdminAccountService } from 'src/app/services/admin-account-service/admin-account-service.service';

@Component({
  selector: 'app-delete-check-account',
  templateUrl: './delete-check-account.component.html',
  styleUrls: ['./delete-check-account.component.css']
})
export class DeleteCheckAccountComponent implements OnInit {

  constructor(
    private AccountService: AdminAccountService,
    public dialogRef: MatDialogRef<DeleteCheckAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  isUser() {
    return this.data.row.role.roleId == 1 ? true : false;
  }
  public onDelete() {
    if(this.data.row.role.roleId != 1) {
      console.log("Cannot deactivate");
    } else {
      this.AccountService.deactivateAccount(this.data.row.accountNumber);
    }
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
