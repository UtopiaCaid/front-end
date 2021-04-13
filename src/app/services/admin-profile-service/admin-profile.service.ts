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
export class AdminProfileService {
  private adminUrl: string;
  private authUrl: string;

  constructor(private http: HttpClient,public router: Router) { 
    const AuthBaseUrl = environment.authUrl
    const AdminBaseUrl = environment.adminUrl
    this.adminUrl = AdminBaseUrl+'adminProfile';
    this.authUrl = AuthBaseUrl+'authentication';
  }

  editAdmin(account: Account) {
    return this.http.put<any>(this.adminUrl, account)
  }

  uniqueAdminName(account: Account) {
    return this.http.post<any>(this.adminUrl, account)
  }
}
