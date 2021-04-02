import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account } from './account';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private authUrl: string;
  private userUrl: string;
  private adminUrl: string;
  private cheatUrl: string;
  //private envLocalMock: string ="http://utopia-airlines.cmnyotwgbsoe.us-east-2.rds.amazonaws.com/";
  private envLocalMock: string ="http://localhost:8080/";
  public baseUrl: string = this.envLocalMock;
  currentUser = {};
  currentUserName: string="";
  public getLoggedInName = new Subject();
  public getLoggedInRoleType = new Subject();
  public getLoggedInEmail = new Subject();
  public getLoggedInRoleId = new Subject();
  public getCurrentAccount = new Subject();
 
  constructor(private http: HttpClient,public router: Router) {
    const AuthBaseUrl = environment.apiUrl
     //const AuthBaseUrl = process.env.AUTH_SERVICE_URL+"/";
    //var AuthBaseUrl= this.envLocalMock;
    this.authUrl = AuthBaseUrl+'Authentication';
    this.userUrl = AuthBaseUrl+'User';
    this.adminUrl = AuthBaseUrl+'Admin';
    this.cheatUrl = AuthBaseUrl+'getSecurityAccount';
  }

  // public getCurrent():  {
  //   return this.http.get(this.authUrl);
  // }

  // public save(user: User) {
  //   return this.http.post<User>(this.authUrl, user);
  // }

  // logIn(user: User) {
  //   return this.http.post<any>(`${this.endpoint}/login`, user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token)
  //       this.getUserProfile(res._id).subscribe((res) => {
  //         this.currentUser = res;
  //         this.router.navigate(['user-profile/' + res.msg._id]);
  //       })
  //     })
  // }

  registerUser(account: Account) {
    return this.http.post<any>(this.userUrl, account)
  }
  registerAdmin(account: Account) {
    return this.http.post<any>(this.adminUrl, account)
  }

  logIn(account: Account) {
    return this.http.post<any>(this.authUrl, account)
      // .subscribe((res: any) => {
      //   localStorage.setItem('access_token', res.token)
      //   // console.log("Token");
      //   // console.log(res.token);
      //  console.log("RES")
      //  console.log(res)
      //   this.getUserProfile().subscribe((res) => {
      //     this.currentUser = res;
      //     this.router.navigate(['home']);    
      //   })
      // },
      // error => {
      //   console.log('Wrong credentials', error)
      // }) 
   
  }

  getUser() {
    //return this.http.get<any>(this.authUrl)
      // .subscribe((res: any) => {
      //   console.log("User");
      //   console.log(res);
      // })
      const authToken = localStorage.getItem('access_token');
      const headerDict = {
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'authorization': "Bearer " + authToken
      }
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict),
      };
      return this.http.get<any>(this.authUrl, requestOptions)
      .subscribe((res: any) => {
        this.currentUser=res;
        this.getUserByUserName();
      })
      // .pipe(
      //   map((res: Response) => {
      //     return res || {}
      //   }),
      //   catchError(this.handleError)
      // )
  }
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

    getUserByUserName() {
      //this.localStorage
      const authToken = localStorage.getItem('access_token');
      const headerDict = {
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': "Bearer " + authToken
      }
      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict),
      };
       this.http.get<any>(this.authUrl,  requestOptions)
      .subscribe((res: any) => {
        localStorage.setItem('current_user', res)
        this.currentUser=res
        return res;
      })

    }

     getCurrentUser() {
       const authToken = localStorage.getItem('access_token');
       const headerDict = {
         'Content-Type':  'application/json',
         'Accept': 'application/json',
         'Access-Control-Allow-Headers': 'Content-Type',
         'Authorization': "Bearer " + authToken
       }
       const requestOptions = {                                                                                                                                                                                 
         headers: new HttpHeaders(headerDict),
       };
        this.http.get<any>(this.authUrl,  requestOptions)
       .subscribe((res: any) => {
         localStorage.setItem('current_user', res)
         this.currentUser=res
         console.log("Res CurrentUser");
         console.log(res);
         return res;
       })
      //  account : Account;
      //  Account account = new Account();
      //  Account account = {
      //   id: "null",
      //   username: "null",
      //   email: "null",
      //   password: "null"
      // };
      // console.log("CurrentUser");
      // console.log(this.currentUser);
      // return this.currentUser;
    }

    getCurrentUser2() {
     
      
      return this.currentUser;
    }

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
     this.getCurrentAccount.next(null)
     this.getLoggedInName.next("")
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
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict),
    // };
    return this.http.get(this.authUrl, {headers: new HttpHeaders(headerDict) })
    .pipe(
      map<any, any>((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


}

