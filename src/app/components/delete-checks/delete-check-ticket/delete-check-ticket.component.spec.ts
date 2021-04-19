import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckTicketComponent } from './delete-check-ticket.component';

describe('DeleteCheckTicketComponent', () => {
  let component: DeleteCheckTicketComponent;
  let fixture: ComponentFixture<DeleteCheckTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
