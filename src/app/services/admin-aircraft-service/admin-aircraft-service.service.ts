import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAircraftServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAircraft() {
    return this.http.get('http://localhost:8080/Aircraft');
  }

}
