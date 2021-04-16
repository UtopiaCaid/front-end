import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketFormComponent } from './user-ticket-form.component';

describe('UserTicketFormComponent', () => {
  let component: UserTicketFormComponent;
  let fixture: ComponentFixture<UserTicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTicketFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
