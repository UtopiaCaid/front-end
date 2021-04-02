import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightFormComponent } from './admin-aircraft-form.component';

describe('AdminFlightFormComponent', () => {
  let component: AdminFlightFormComponent;
  let fixture: ComponentFixture<AdminFlightFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlightFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
