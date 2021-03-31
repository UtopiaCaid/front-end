import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAirportServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAirports() {
    return this.http.get('http://localhost:8080/Airport');
  }
}
