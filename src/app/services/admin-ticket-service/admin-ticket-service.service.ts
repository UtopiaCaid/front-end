import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTicketServiceService {

  constructor(private http: HttpClient) { }

  public retrieveTickets() {
    console.log("retrieveTickets");
    return this.http.get('http://localhost:8080/Ticket');
  }


  public insertTicket(flight: {}, traveler: {}, payment: {}, confirmationCode: number, ticketPrice: number,
    ticketClass: number,     dateIssued: string) {

    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json')

    let postData = {
      "confirmationCode": confirmationCode,
      "flight": flight,
      "traveler": traveler,
      "payment": payment,
      "ticketPrice": ticketPrice,
      "ticketClass": ticketClass,
      "dateIssued": dateIssued
    };


    this.http.post('http://localhost:8080/Ticket', postData)
      .toPromise().then(data => console.log(data));
  }

  public updateTicket(
    ticketNo: number, flight: {}, traveler: {}, payment: {}, 
    confirmationCode: number, ticketPrice: number,
    ticketClass: number, dateIssued: string
  ) {
    let updateData = {
      "ticketNo": ticketNo,
      "confirmationCode": confirmationCode,
      "flight": flight,
      "traveler": traveler,
      "payment": payment,
      "ticketPrice": ticketPrice,
      "ticketClass": ticketClass,
      "dateIssued": dateIssued
    }

    this.http.put('http://localhost:8080/Ticket', updateData).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }

  public deleteTicket(ticketNo: number) {
    let deleteData = {
      ticketNo: ticketNo,
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: deleteData
    }

    this.http.delete('http://localhost:8080/Ticket', options).toPromise()
      .then(data => console.log(data)).catch(e => console.log(e));
  }
}
