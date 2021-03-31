import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAircraftTypeServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAircraftType() {
    return this.http.get('http://localhost:8080/AircraftType');
  }

}
