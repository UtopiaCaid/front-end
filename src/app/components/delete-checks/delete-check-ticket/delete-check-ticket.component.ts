import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminTicketServiceService as AdminTicketService } from 'src/app/services/admin-ticket-service/admin-ticket-service.service';

@Component({
  selector: 'app-delete-check-ticket',
  templateUrl: './delete-check-ticket.component.html',
  styleUrls: ['./delete-check-ticket.component.css']
})
export class DeleteCheckTicketComponent implements OnInit {

  constructor(
    private TicketService: AdminTicketService,
    public dialogRef: MatDialogRef<DeleteCheckTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onDelete() {
    this.TicketService.deleteTicket(this.data.row.ticketNo);
    this.dialogRef.close();
  }

  public exit() {
    this.dialogRef.close();
  }

}
