import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelerFormComponent } from './admin-traveler-form.component';

describe('AdminTravelerFormComponent', () => {
  let component: AdminTravelerFormComponent;
  let fixture: ComponentFixture<AdminTravelerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
