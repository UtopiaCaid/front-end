import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentServiceService {

  constructor(private http: HttpClient) { }

  public retrievePayments() {
    return this.http.get(environment.adminFuncUrl + 'Payment');
  }
}
