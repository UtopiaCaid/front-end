import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAircraftTypeFormComponent } from './admin-aircraftType-form.component';

describe('AdminAircraftTypeFormComponent', () => {
  let component: AdminAircraftTypeFormComponent;
  let fixture: ComponentFixture<AdminAircraftTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAircraftTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAircraftTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
