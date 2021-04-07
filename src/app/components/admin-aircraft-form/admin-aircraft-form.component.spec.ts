import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAircraftFormComponent } from './admin-aircraft-form.component';

describe('AdminAircraftFormComponent', () => {
  let component: AdminAircraftFormComponent;
  let fixture: ComponentFixture<AdminAircraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAircraftFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAircraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
