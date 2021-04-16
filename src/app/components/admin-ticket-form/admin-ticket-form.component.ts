import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminTicketServiceService as AdminTicketService } from 'src/app/services/admin-ticket-service/admin-ticket-service.service';
import { AdminFlightServiceService as AdminFlightService } from 'src/app/services/admin-flight-service/admin-flight-service.service';
import { AdminTravelerServiceService as AdminTravelerService} from 'src/app/services/admin-traveler-service/admin-traveler-service.service';
import { AdminPaymentServiceService as AdminPaymentService} from 'src/app/services/admin-payment-service/admin-payment-service.service';
/* modal */
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

interface Flight {
  flightNo: number;
  flightGate: string;
  aircraft: object;
  airportDep: object;
  airportArr: object;
  basePrice: number;
  departure: string;
  arrival: string;
  status: string;
}

interface Traveler {
  travelerId: number;
  account: object;
  firstName: string;
  dob: string;
  middleName: string;
  lastName: string;
  gender: string;
  knownTravelerNumber: number;
}

interface Payment {
  paymentId: number;
  account: object;
  dateProcessed: string;
}

@Component({
  selector: 'app-admin-ticket-form',
  templateUrl: './admin-ticket-form.component.html',
  styleUrls: ['./admin-ticket-form.component.css']
})
export class AdminTicketFormComponent implements OnInit {

  ngOnInit(): void {
    this.getAllFlights();
    this.getAllTravelers();
    this.getAllPayments();
    this.populate();
  }

  constructor(
    private TicketService: AdminTicketService,
    private FlightService: AdminFlightService,
    private PaymentService: AdminPaymentService,
    private TravelerService: AdminTravelerService,
    public dialogRef: MatDialogRef<AdminTicketFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public getAllFlights() {
    let res = this.FlightService.retrieveFlights();
    res.subscribe(flight => this.flights = flight as Flight[]);
  }

  public getAllTravelers() {
    let res = this.TravelerService.retrieveTraveler();
    res.subscribe(traveler => this.travelers = traveler as Traveler[]);
  }

  public getAllPayments() {
    let res = this.PaymentService.retrievePayments();
    res.subscribe(payment => this.payments = payment as Payment[]);
  }

  selectedFlight!: {};
  flights!: Flight[];
  selectedTraveler!: {};
  travelers!: Traveler[];
  selectedPayment!: {};
  payments!: Payment[];


  compareFunctionFlight(o1: any, o2: any) {
    return o1 && o2 ? o1.flightId === o2.flightId : o1 === o2;
  }

  compareFunctionTraveler(o1: any, o2: any) {
    return o1 && o2 ? o1.travelerId === o2.travelerId : o1 === o2;
  }

  compareFunctionPayment(o1: any, o2: any) {
    return o1 && o2 ? o1.paymentId === o2.paymentId : o1 === o2;
  }

  confirmationCode = new FormControl(0, [Validators.required]);
  ticketPrice = new FormControl(0, [Validators.required]);
  ticketClass = new FormControl(0, [Validators.required]);
  dateIssued = new FormControl('', [Validators.required]);
  paymentCheck = new FormControl(this.payments, [Validators.required]);
  travelerCheck = new FormControl(this.travelers, [Validators.required]);
  flightCheck = new FormControl(this.flights, [Validators.required]);

  getErrorMessage() {
    return this.ticketPrice.hasError('required') ? 'you must enter a ticket price' :
      this.ticketClass.hasError('required') ? 'you must enter a ticket class' :
        this.paymentCheck.hasError('required') ? 'you must select a payment' :
          this.flightCheck.hasError('required') ? 'you must select a flight' :
             this.travelerCheck.hasError('required') ? 'you must select a traveler' : ''
  }

  public populate() {
    if (this.data) {
      console.log('An ticket is edited not created')
      console.log(this.data.row);
      this.ticketPrice.setValue(this.data.row.ticketPrice);
      this.ticketClass.setValue(this.data.row.ticketClass);
      this.dateIssued.setValue(this.data.row.dateIssued);
      this.travelerCheck.setValue(this.data.row.travelerCheck);
      this.flightCheck.setValue(this.data.row.flightCheck);
      this.selectedFlight = this.data.row.flight;
      this.selectedTraveler = this.data.row.traveler;

    }
  }

  public formSubmit() {
    if (
      this.selectedFlight == undefined ||
      this.selectedTraveler == undefined ||
      this.ticketPrice.hasError('required') ||
      this.ticketClass.hasError('required') ||
      this.dateIssued.hasError('required')
    ) {
      alert('Please insert the required fields')
    } else if (this.data) {
      this.TicketService.updateTicket(
        this.data.row.ticketNo,
        this.selectedFlight,
        this.selectedTraveler,
        this.selectedPayment,
        this.confirmationCode.value,
        this.ticketPrice.value,
        this.ticketClass.value,
        this.dateIssued.value
      )
      this.dialogRef.close();
    } else {
      this.TicketService.insertTicket(
        this.selectedFlight,
        this.selectedTraveler,
        this.selectedPayment,
        this.confirmationCode.value,
        this.ticketPrice.value,
        this.ticketClass.value,
        this.dateIssued.value
      );
      this.dialogRef.close();
    }
  }
}
