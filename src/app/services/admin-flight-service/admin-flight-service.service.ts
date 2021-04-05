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


    this.http.post('http://localhost:8080/flights', postData).toPromise()
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

    this.http.put('http://localhost:8080/flights', updateData).toPromise()
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

    this.http.delete('http://localhost:8080/flights', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
