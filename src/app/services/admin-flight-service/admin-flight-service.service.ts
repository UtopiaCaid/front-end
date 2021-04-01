import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminFlightServiceService {

  constructor(private http: HttpClient) { }



  public retrieveFlights() {
    return this.http.get('http://localhost:8080/flights');
  }



  public insertFlight(flightGate: string, airportIdDeparture: {},
    airportIdArrival: {}, aircraft: {}, basePrice: number, departure: string,
    arrival: string, status: string) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

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

    // let jsondata = <JSON>this.postData;
    console.log('hit');
    console.log(postData);
    console.log(JSON.stringify(postData));

    this.http.post('http://localhost:8080/flights', postData)
      .toPromise().then(data => console.log(data));
    console.log('this is after the post');
  }
}
