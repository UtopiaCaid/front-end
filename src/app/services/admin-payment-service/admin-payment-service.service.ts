import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentServiceService {

  constructor(private http: HttpClient) { }

  public retrievePayments() {
    return this.http.get('http://localhost:8080/Payment');
  }
}
