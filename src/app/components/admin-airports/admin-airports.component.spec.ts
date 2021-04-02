import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirportsComponent } from './admin-airports.component';

describe('AdminAirportsComponent', () => {
  let component: AdminAirportsComponent;
  let fixture: ComponentFixture<AdminAirportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAirportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
