import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminFlightServiceService {

  constructor(private http: HttpClient) { }

  public retrieveFlights() {
    return this.http.get('http://localhost:8080/flights');
  }
}
