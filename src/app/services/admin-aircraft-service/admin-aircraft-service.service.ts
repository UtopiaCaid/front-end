import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAircraftServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAircraft() {
    return this.http.get(environment.adminFuncUrl + 'Aircraft');
  }


  public insertAircraft(aircraftType: {}, seatCount: number, firstClassCount: number,
    secondClassCount: number, thirdClassCount: number, aircraftStatus: string) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

    let postData = {
      "aircraftType": aircraftType,
      "seatCount": seatCount,
      "firstClassCount": firstClassCount,
      "secondClassCount": secondClassCount,
      "thirdClassCount": thirdClassCount,
      "aircraftStatus": aircraftStatus
    };


    this.http.post(environment.adminFuncUrl + 'Aircraft', postData)
      .toPromise().then(data => console.log(data));
  }

  public updateAircraft(
    aircraftId: number, aircraftType: {},
    seatCount: number, firstClassCount: number,
    secondClassCount: number, thirdClassCount: number,
    aircraftStatus: string
  ) {
    let updateData = {
      "aircraftId": aircraftId,
      "aircraftType": aircraftType,
      "seatCount": seatCount,
      "firstClassCount": firstClassCount,
      "secondClassCount": secondClassCount,
      "thirdClassCount": thirdClassCount,
      "aircraftStatus": aircraftStatus
    }

    this.http.put(environment.adminFuncUrl + 'Aircraft', updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteAircraft(aircraftId: number) {
    let deleteData = {
      aircraftId: aircraftId,
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete(environment.adminFuncUrl + 'Aircraft', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
