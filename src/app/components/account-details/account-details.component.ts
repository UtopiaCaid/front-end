import { Component, OnInit } from '@angular/core';
import { AccountDetails } from 'src/app/services/account-service/account-details';
import { AccountService } from '../../services/account-service/account.service'

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  accountDetails!: AccountDetails;

  constructor(private service: AccountService) { 
   
  }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  public getAccountDetails(){
    let res = this.service.getAccountDetails();
    
  }

}
