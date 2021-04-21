import {AirportReports} from '../admin-airport-service/airport-reports';

export interface FlightReports {
    flightNo: number;
    flightGate: string;
    airportDeparture: AirportReports;
    airportArrival: AirportReports;
    departure: string;
    arrival: string;
    status: string;
}
