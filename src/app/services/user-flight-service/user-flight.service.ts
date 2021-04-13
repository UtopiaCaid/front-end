import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserFlightService {

  private baseUrl: string;
  private flightsUrl: string;

  constructor(
    private http: HttpClient
  ) { 
    const UserBaseUrl = environment.userUrl
    this.baseUrl= UserBaseUrl
    this.flightsUrl = UserBaseUrl+"flights"
  }

  public retrieveFlights() {
    return this.http.get(this.flightsUrl);
  }



  public insertFlight(flightGate: string, airportIdDeparture: {},
    airportIdArrival: {}, aircraft: {}, basePrice: number, departure: string,
    arrival: string, status: string) {


    let postData = {
      "flightGate": flightGate,
      "airportDeparture": airportIdDeparture,
      "airportArrival": airportIdArrival,
      "aircraft": aircraft,
      "basePrice": basePrice,
      "departure": departure,
      "arrival": arrival,
      "status": status
    };


    this.http.post(this.flightsUrl, postData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public updateFlight(
    flightNo: number, flightGate: string, airportIdDeparture: {},
    airportIdArrival: {}, aircraft: {}, basePrice: number, departure: string,
    arrival: string, status: string
  ) {
    let updateData = {
      "flightNo": flightNo,
      "flightGate": flightGate,
      "airportDeparture": airportIdDeparture,
      "airportArrival": airportIdArrival,
      "aircraft": aircraft,
      "basePrice": basePrice,
      "departure": departure,
      "arrival": arrival,
      "status": status
    }

    this.http.put(this.flightsUrl, updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteFlight(flightNo: number) {
    let deleteData = {
      flightNo: flightNo,
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete(this.flightsUrl, options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
