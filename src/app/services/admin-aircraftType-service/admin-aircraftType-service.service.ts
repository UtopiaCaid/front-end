import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAircraftTypeServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAircraftTypes() {
    return this.http.get(environment.adminFuncUrl + 'AircraftType');
  }

  public insertAircraftType(aircraftTypeId: number, aircraftTypeName: string,
    seatMaximum: number, manufacturer: string) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

    let postData = {
      "aircraftTypeId": aircraftTypeId,
      "aircraftTypeName": aircraftTypeName,
      "seatMaximum": seatMaximum,
      "manufacturer": manufacturer,
    };

    console.log(postData);
    console.log(JSON.stringify(postData));

    this.http.post(environment.adminFuncUrl + 'AircraftType', postData)
      .toPromise().then(data => console.log(data));
  }

  public updateAircraftType(
    aircraftTypeId: number, aircraftTypeName: string,
    seatMaximum: number, manufacturer: string
  ) {
    let updateData = {
      "aircraftTypeId": aircraftTypeId,
      "aircraftTypeName": aircraftTypeName,
      "seatMaximum": seatMaximum,
      "manufacturer": manufacturer,
    }

    this.http.put(environment.adminFuncUrl + 'AircraftType', updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteAircraftType(aircraftTypeId: number) {
    let deleteData = {
      aircraftTypeId: aircraftTypeId,
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete(environment.adminFuncUrl + 'AircraftType', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
