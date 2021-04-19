import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTravelerServiceService {

  constructor(private http: HttpClient) { }

  public retrieveTraveler() {
    return this.http.get('http://localhost:8080/Traveler');
  }


  public insertTraveler(account: {}, firstName: string,
    dob: string, middleName: string, lastName: string, gender: string, knownTravelerNumber: number) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

    let postData = {
      account: account,
      firstName: firstName,
      dob: dob,
      middleName: middleName,
      lastName: lastName,
      gender: gender,
      knownTravelerNumber: knownTravelerNumber
    };

    this.http.post('http://localhost:8080/Traveler', postData)
      .toPromise().then(data => console.log(data));
  }

  public updateTraveler(
    travelerId: number, account: {}, firstName: string,
    dob: string, middleName: string, lastName: string, 
    gender: string, knownTravelerNumber: number
  ) {
    let updateData = {
      travelerId: travelerId,
      account: account,
      firstName: firstName,
      dob: dob,
      middleName: middleName,
      lastName: lastName,
      gender: gender,
      knownTravelerNumber: knownTravelerNumber
    }
    
    this.http.put('http://localhost:8080/Traveler', updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteTraveler(travelerId: number) {
    let deleteData = {
      travelerId: travelerId
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete('http://localhost:8080/Traveler', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
