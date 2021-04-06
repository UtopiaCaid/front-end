import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAircraftServiceService {

  constructor(private http: HttpClient) { }

  public retrieveAircraft() {
    return this.http.get('http://localhost:8080/Aircraft');
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

    console.log(postData);
    console.log(JSON.stringify(postData));

    this.http.post('http://localhost:8080/Aircraft', postData)
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

    this.http.put('http://localhost:8080/Aircraft', updateData).toPromise()
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

    this.http.delete('http://localhost:8080/Aircraft', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
