import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account } from '../auth-service/account';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userUrl: string;
  private authUrl: string;
  private userAccountUrl: string;
  public isUnique!: Boolean;

  constructor(private http: HttpClient,public router: Router) { 
    const AuthBaseUrl = environment.authUrl
    const UserBaseUrl = environment.userUrl
    this.userUrl = UserBaseUrl+'userProfile';
    this.authUrl = AuthBaseUrl+'authentication';
    this.userAccountUrl = UserBaseUrl+"Account"
  }

  // editUser(account: Account) {
  //   return this.http.put<any>(this.userUrl, account)
  // }

  public updateUser(account: Account, accountNumber: number){
    account.accountNumber=accountNumber.toString();
    var account2= account;
    //account2.accountNumber=accountNumber;
    // console.log("Updating user")
    // console.log(account)

    return this.http.put(this.userAccountUrl,account)
  }

   uniqueUserName(account: Account) {
    return this.http.get<Array<Account>>(this.userAccountUrl)
    .pipe(
      map<any, any>((res) => {

          for( var index in res)  {
      if(res[index].username === account.username){
        return false
      }
      }
  
      return true;

      }))
 
  }



}
