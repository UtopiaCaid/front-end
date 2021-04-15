export interface TicketData {
    aircraftId: number;
    confirmationCode: number,
    flight: object;
    traveler: object;
    payment: object;
    ticketPrice: number;
    ticketClass: number;
    dateIssued: string;
}
