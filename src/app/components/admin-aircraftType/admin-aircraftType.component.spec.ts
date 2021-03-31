import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAircraftTypeComponent } from './admin-aircraftType.component';

describe('AdminAircraftTypeComponent', () => {
  let component: AdminAircraftTypeComponent;
  let fixture: ComponentFixture<AdminAircraftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAircraftTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAircraftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
