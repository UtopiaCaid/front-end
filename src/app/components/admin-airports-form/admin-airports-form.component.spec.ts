import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirportsFormComponent } from './admin-airports-form.component';

describe('AdminAirportsFormComponent', () => {
  let component: AdminAirportsFormComponent;
  let fixture: ComponentFixture<AdminAirportsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAirportsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAirportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
