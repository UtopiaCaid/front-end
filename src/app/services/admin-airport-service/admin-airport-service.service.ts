import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAirportServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAirports() {
    return this.http.get('http://localhost:8080/Airport');
  }

  public insertAirport(airportCode: number, city: string,
    airportName: string, status: string) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

    let postData = {
      "airportCode": airportCode,
      "city": city,
      "airportName": airportName,
      "status": status,
    };

    this.http.post('http://localhost:8080/Airport', postData)
      .toPromise().then(data => console.log(data));
  }

  public updateAirport(
    airportId: number, airportCode: number, city: string,
    airportName: string, status: string
  ) {
    let updateData = {
      "airportId": airportId,
      "airportCode": airportCode,
      "city": city,
      "airportName": airportName,
      "status": status,
    }

    this.http.put('http://localhost:8080/Airport', updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteAirport(airportId: number) {
    let deleteData = {
      airportId: airportId,
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete('http://localhost:8080/Airport', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
