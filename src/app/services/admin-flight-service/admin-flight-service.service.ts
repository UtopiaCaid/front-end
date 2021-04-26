import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminFlightServiceService {

  constructor(private http: HttpClient) { }

  public retrieveFlights() {
    return this.http.get(environment.adminFuncUrl + 'flights');
  }

  public retrieveFlightCount() {
    return this.http.get(environment.adminFuncUrl + 'flightcount');
  }

  public getPagination(field : string, sort : string, page : number, pageSize: number) {
    switch(field) {
      case("flightNo"):
        break;
      case("flightGate"):
        break;
      case("airportDeparture"):
        break;
      case("airportArrival"):
        break;
      case("departure"):
        break;
      case("arrival"):
        break;
      case("status"):
        break;
      default:
        field = "flightNo"; // should never get here
    }
    let paginationData = {
      "field" : field,
      "sort" : sort,
      "page": page,
      "pageSize": pageSize
    }
    console.log(this.http.post(environment.adminFuncUrl + 'flights/pagination', paginationData));
    return this.http.post(environment.adminFuncUrl + 'flights/pagination', paginationData);
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


    this.http.post(environment.adminFuncUrl + 'flights', postData).toPromise()
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

    this.http.put(environment.adminFuncUrl + 'flights', updateData).toPromise()
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

    this.http.delete(environment.adminFuncUrl + 'flights', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}