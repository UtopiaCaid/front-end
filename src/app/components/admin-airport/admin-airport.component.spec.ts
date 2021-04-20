import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirportComponent } from './admin-airport.component';

describe('AdminAirportComponent', () => {
  let component: AdminAirportComponent;
  let fixture: ComponentFixture<AdminAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAirportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
