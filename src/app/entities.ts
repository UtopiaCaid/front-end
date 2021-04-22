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
    aircraftType: AircraftTypeData;
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
    role: RoleTypeData;
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
    flight: FlightReports;
    traveler: TravelerData;
    payment: PaymentData;
    ticketPrice: number;
    ticketClass: number;
    dateIssued: string;
}

export interface RoleTypeData {
    roleId: number;
    roleType: string;
}

export interface TravelerData {
    traveler: TravelerData;
    account: AccountData;
    firstName: string;
    dob: string;
    middleName: string;
    lastName: string;
    gender: string;
    knownTravelerNumber: number;
}
