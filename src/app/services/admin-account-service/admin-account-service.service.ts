import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountServiceService {

  constructor(private http: HttpClient) { }

  public retrieveUserAccounts() {
    return this.http.get('http://localhost:8080/Account/User');
  }
  public retrieveAccounts() {
    return this.http.get('http://localhost:8080/Account');
  }

  public insertAccount( username: string, role: Object, email: string, 
    password: string) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

    let postData = {
      "username": username,
      "role": role,
      "email": email,
      "password": password
    };

    console.log(postData);
    console.log(JSON.stringify(postData));

    this.http.post('http://localhost:8080/Account', postData)
      .toPromise().then(data => console.log(data));
  }

  public updateAccount(
    accountNumber: number, username: string, 
    email: string, password: string, dateCreated: string
  ) {
    let updateData = {
      "accountNumber": accountNumber,
      "username": username,
      "email": email,
      "password": password,
      "dateCreated": dateCreated,
    }

    this.http.put('http://localhost:8080/Account', updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteAccount(accountNumber: number) {
    let deleteData = {
      "accountNumber": accountNumber,
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete('http://localhost:8080/Account', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deactivateAccount(accountNumber: number) {
    console.log("Account number = " + accountNumber);
    let updateData = {
      "accountNumber": accountNumber
    }

    let body = updateData;
    this.http.put('http://localhost:8080/Account/Deactivation', body).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
