import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirportFormComponent } from './admin-airport-form.component';

describe('AdminAirportFormComponent', () => {
  let component: AdminAirportFormComponent;
  let fixture: ComponentFixture<AdminAirportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAirportFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
