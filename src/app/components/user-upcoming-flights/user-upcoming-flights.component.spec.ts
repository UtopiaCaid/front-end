import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpcomingFlightsComponent } from './user-upcoming-flights.component';

describe('UserUpcomingFlightsComponent', () => {
  let component: UserUpcomingFlightsComponent;
  let fixture: ComponentFixture<UserUpcomingFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpcomingFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpcomingFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
