import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account } from './account';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private authUrl: string;
  private userUrl: string;
  private adminUrl: string;
  currentUser = {};
  currentUserName: string="";
  public getLoggedInName = new Subject();
  public getLoggedInRoleType = new Subject();
  public getLoggedInEmail = new Subject();
  public getLoggedInRoleId = new Subject();
  public getLoggedInFullName = new Subject();
  public getLoggedInPhoneNum= new Subject();
  public getCurrentAccount = new Subject();
 
  constructor(private http: HttpClient,public router: Router) {
    const AuthBaseUrl = environment.authUrl
    this.authUrl = AuthBaseUrl+'authentication';
    this.userUrl = AuthBaseUrl+'user';
    this.adminUrl = AuthBaseUrl+'admin';
  }

 

  registerUser(account: Account) {
    return this.http.post<any>(this.userUrl, account)
  }
  registerAdmin(account: Account) {
    return this.http.post<any>(this.adminUrl, account)
  }

  logIn(account: Account) {

    return this.http.post<any>(this.authUrl, account) 
  }

  // getUser() {
  //     const authToken = localStorage.getItem('access_token');
  //     const headerDict = {
  //       'Content-Type':  'application/json',
  //       'Accept': 'application/json',
  //       'Access-Control-Allow-Headers': 'Content-Type',
  //       'authorization': "Bearer " + authToken
  //     }
  //     const requestOptions = {                                                                                                                                                                                 
  //       headers: new HttpHeaders(headerDict),
  //     };
  //     return this.http.get<any>(this.authUrl, requestOptions)
  //     .subscribe((res: any) => {
  //       this.currentUser=res;
  //       this.getUserByUserName();
  //     })
  // }
    // Error 
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }

    // getUserByUserName() {
    //   const authToken = localStorage.getItem('access_token');
    //   const headerDict = {
    //     'Content-Type':  'application/json',
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //     'Authorization': "Bearer " + authToken
    //   }
    //   const requestOptions = {                                                                                                                                                                                 
    //     headers: new HttpHeaders(headerDict),
    //   };
    //    this.http.get<any>(this.authUrl,  requestOptions)
    //   .subscribe((res: any) => {
    //     localStorage.setItem('current_user', res)
    //     this.currentUser=res
    //     return res;
    //   })

    // }

    //  getCurrentUser() {
    //    const authToken = localStorage.getItem('access_token');
    //    const headerDict = {
    //      'Content-Type':  'application/json',
    //      'Accept': 'application/json',
    //      'Access-Control-Allow-Headers': 'Content-Type',
    //      'Authorization': "Bearer " + authToken
    //    }
    //    const requestOptions = {                                                                                                                                                                                 
    //      headers: new HttpHeaders(headerDict),
    //    };
    //     this.http.get<any>(this.authUrl,  requestOptions)
    //    .subscribe((res: any) => {
    //      localStorage.setItem('current_user', res)
    //      this.currentUser=res
    //      return res;
    //    })
    // }

    // getCurrentUser2() {
    //   return this.currentUser;
    // }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
     localStorage.removeItem('current_roleType');
     localStorage.removeItem('current_roleId');
     localStorage.removeItem('currentCart');
     localStorage.removeItem('current_accountNum');
     localStorage.clear();
     this.getCurrentAccount.next(null)
     this.getLoggedInName.next("")
     this.getLoggedInEmail.next("")
     this.getLoggedInRoleId.next("")
     this.getLoggedInFullName.next("")
     this.getLoggedInPhoneNum.next("")
  
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }


  getUserProfile(): Observable<any> {
    const authToken = localStorage.getItem('access_token');
    const headerDict = {
      'Content-Type':  'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': "Bearer " + authToken
    }
    return this.http.get(this.authUrl, {headers: new HttpHeaders(headerDict) })
    .pipe(
      map<any, any>((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getDecodedAccessToken(): any {

    var token = this.getToken();
    var token2 = token!= null ? token : "{}"
   
    try{
      return jwt_decode(token2);
    }
    catch(Error){
        return null;
    }
  
  }

  getRole() {
    if(this.isLoggedIn){
      var decode= this.getDecodedAccessToken();
      var role = decode.authorities
      return role;
    }
    else return null
  }

 


}

