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

  constructor(private http: HttpClient,public router: Router) { 
    const AuthBaseUrl = environment.apiUrl
    const UserBaseUrl = environment.apiUrl
    this.userUrl = UserBaseUrl+'UserProfile';
    this.authUrl = AuthBaseUrl+'Authentication';
  }

  editUser(account: Account) {
    return this.http.put<any>(this.userUrl, account)
  }

  uniqueUserName(account: Account) {
    return this.http.post<any>(this.userUrl, account)
  }
}
