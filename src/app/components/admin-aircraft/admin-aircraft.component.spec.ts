import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAircraftComponent } from './admin-aircraft.component';

describe('AdminAircraftComponent', () => {
  let component: AdminAircraftComponent;
  let fixture: ComponentFixture<AdminAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAircraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
