import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public getAccountDetails() {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: localStorage.getItem("Authorization")
    }

    return this.http.get('http://localhost:8080/flights', options)
  }
}
