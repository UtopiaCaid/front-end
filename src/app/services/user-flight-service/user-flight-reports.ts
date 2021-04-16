export interface UserFlightReports
{
    flightNo: number,
    flightGate: string,
    airportDeparture: {
        airportId: number,
        airportCode: number,
        city: string,
        airportName: string,
        status: string,
    },
    airportArrival: {
        airportId: number,
        airportCode: number,
        city: string,
        airportName: string,
        status: string,
    },
    aircraft: {
        aircraftId: number,
        seatCount: number,
        firstClassCount: number,
        secondClassCount: number,
        thirdClassCount: number,
        aircraftType: {
            aircraftTypeId: number,
            aircraftTypeName: string,
            seatMaximum: number,
            manufacturer: string,
        },
        aircraftStatus: string,
    },
    basePrice: number,
    departure: Date,
    arrival: Date,
    status: string,
}