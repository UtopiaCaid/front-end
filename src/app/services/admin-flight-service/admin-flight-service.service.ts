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



  public insertFlight(flightGate: string, airportIdDeparture: {},
    airportIdArrival: {}, aircraft: {}, basePrice: number, departure: string,
    arrival: string, status: string) {

    let postData = {
      "flightGate": flightGate,
      "airportIdDeparture": airportIdDeparture,
      "airportIdArrival": airportIdArrival,
      "aircraft": aircraft,
      "basePrice": basePrice,
      "departure": departure,
      "arrival": arrival,
      "status": status
    };

    return this.http.post('http:/localhost:8080/flights', postData)
      .toPromise().then((data: any) => console.log(data));
  }
}
