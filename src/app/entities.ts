export interface FlightReports {
    flightNo: number;
    flightGate: string;
    airportDeparture: AirportReports;
    airportArrival: AirportReports;
    departure: string;
    arrival: string;
    status: string;
}

export interface AircraftData {
    aircraftId: number;
    aircraftType: object;
    seatCount: number;
    firstClassCount: number;
    secondClassCount: number;
    thirdClassCount: number;
    aircraftStatus: string;
}

export interface AircraftTypeData {
    aircraftTypeId: number;
    aircraftTypeName: string;
    seatMaximum: number;
    manufacturer: string;
}

export interface AirportReports {
    airportId: number;
    airportCode: number;
    city: string;
    airportName: string;
    status: string;
}

export interface AccountData {
    accountNumber: number;
    role: object[];
    username: string;
    email: string;
    password: string;
    dateCreated: string;
}

export interface PaymentData {
    paymentId: number;
    account: object;
    dateProcessed: string;
}

export interface TicketData {
    ticketNo: number;
    confirmationCode: number,
    flight: object;
    traveler: object;
    payment: object;
    ticketPrice: number;
    ticketClass: number;
    dateIssued: string;
}

