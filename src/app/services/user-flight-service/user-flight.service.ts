import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FlightReports } from 'src/app/services/admin-flight-service/flight-reports';
import {UserTickets} from 'src/app/services/user-flight-service/user-tickets';
import { Account } from '../auth-service/account';

@Injectable({
  providedIn: 'root'
})
export class UserFlightService {

  private baseUrl: string;
  private flightsUrl: string;
  private userAccountUrl: string;
  public currentUserFlight = new Subject();
  public currentUserTicket = new Subject();
  public currentCart = new Subject<UserTickets[]>();
  public userTickets: UserTickets[] = new Array<UserTickets>();
  public userHistoryTickets: UserTickets[] = new Array<UserTickets>();
  public baseOption: {};
  

  constructor(
    private http: HttpClient
  ) { 
    const UserBaseUrl = environment.userUrl
    this.baseUrl= UserBaseUrl
    this.flightsUrl = UserBaseUrl+"flights"
    this.userAccountUrl = UserBaseUrl+"Account"
    this.baseOption= {
      "airportDepId": 1,
      "airportArrId": 2,
      "flightDepBeginDate": "2021-04-01",
      "flightDepEndDate": "2021-04-05", 
      "flightRetBeginDate": "2021-04-19",
      "flightRetEndDate": "2021-04-25"
  }
  }

     // Error 
     handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }

  public retrieveFlights() {
   return this.http.get(this.flightsUrl);
  }
 
  public  retrieveAccountTicketHistory(num: String):Observable<any>  {
    return this.http.post(this.userAccountUrl+"/Ticket/History",{"accountNumber" : num})
    .pipe(
      map<any, any>((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  public  retrieveAccountFlightHistory(num: String):Observable<any>  {
    return this.http.post(this.userAccountUrl+"/Flight/History",{"accountNumber" : num})
    .pipe(
      map<any, any>((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }


  ///Curently the body for all retrive layovers requests are all hard coded in. Will be changed.
  public  retrieveOneWayNonLayover(
    airportDepId: number, airportArrId: number,
    flightDepBeginDate: string, flightDepEndDate : string ):Observable<any>  {
    var body = {
      airportDepId: 1,
      airportArrId: 2,
      flightDepBeginDate: "2021-04-01T00:00:00",
      flightDepEndDate: "2021-04-20T00:00:00"
  }



    return this.http.post(this.baseUrl+"/OneWayNonLayover",body)
   
  }

  public  retrieveOneWayAllLayover(
    airportDepId: number, airportArrId: number,
    flightDepBeginDate: string, flightDepEndDate : string ):Observable<any>  {
    var body = {
      airportDepId: 1,
      airportArrId: 2,
      flightDepBeginDate: "2021-04-01T00:00:00",
      flightDepEndDate: "2021-04-20T00:00:00"
  }
    return this.http.post(this.baseUrl+"/OneWayAllLayover",body) 
  }

  public  retrieveRoundTripNoLayover(
    airportDepId: number, airportArrId: number,
    flightDepBeginDate: string, flightDepEndDate : string,
    flightRetBeginDate: string, flightRetEndDate : string ):Observable<any>  {
    var body = {
      airportDepId: 1,
      airportArrId: 2,
      flightDepBeginDate: "2021-04-01T00:00:00",
      flightDepEndDate: "2021-04-20T00:00:00",
      flightRetBeginDate: "2021-04-25T00:00:00",
      flightRetEndDate: "2021-05-30T00:00:00"
  }
    return this.http.post(this.baseUrl+"/RoundTripNoLayover",body) 
  }

  public  retrieveRoundTripLayovers(
    airportDepId: number, airportArrId: number,
    flightDepBeginDate: string, flightDepEndDate : string,
    flightRetBeginDate: string, flightRetEndDate : string ):Observable<any>  {
    var body = {
      airportDepId: 1,
      airportArrId: 2,
      flightDepBeginDate: "2021-04-01T00:00:00",
      flightDepEndDate: "2021-04-05T00:00:00",
      flightRetBeginDate: "2021-04-19T00:00:00",
      flightRetEndDate: "2021-04-25T00:00:00"
  }
    return this.http.post(this.baseUrl+"/RoundTripLayovers",body) 
  }

  public retrieveAirports() {
    return this.http.get(this.baseUrl+'Airport');
  }

  public updateUser(account: Account){
    return this.http.put(this.userAccountUrl,account)
  }


  


  public setCurrentUserFlight( flightReport : FlightReports){
    this.currentUserFlight.next(flightReport)
  }
  public reSetCurrentUserFlight( ){
    this.currentUserFlight.next(null)
  }

  public setCurrentUserTicket( userTicket : UserTickets){
    this.currentUserTicket.next(userTicket)
  }
  public reSetCurrentUserTicket(){
    this.currentUserTicket.next(null)
  }
  public setCurrentCart( userTicket : UserTickets){

    if(localStorage.getItem('currentCart'))
    this.userTickets = JSON.parse(localStorage.getItem('currentCart') || "{}" )
    this.userTickets.push(userTicket);
    this.currentCart.next(this.userTickets)

    
    this.currentUserTicket.next(userTicket)
 
     localStorage.setItem('currentCart', JSON.stringify(this.userTickets));
    this.currentUserTicket.next();

  }

  public removeFromCurrentCart( userTicket : UserTickets){

    if(localStorage.getItem('currentCart'))
    this.userTickets = JSON.parse(localStorage.getItem('currentCart') || "{}" )
    let result = this.userTickets.filter(function(x){
      if(JSON.stringify(x)===JSON.stringify(userTicket))
      return false
      else 
      return x
    })
    this.reSetCurrentCart();
    this.userTickets = result;
    this.currentCart.next(result)
     localStorage.setItem('currentCart', JSON.stringify(this.userTickets));
    this.currentUserTicket.next();
  }



  public reSetCurrentCart(){
    this.currentCart.next([])
    this.userTickets= [];
    localStorage.removeItem('currentCart')
  }


  

}
