import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelerComponent } from './admin-traveler.component';

describe('AdminTravelerComponent', () => {
  let component: AdminTravelerComponent;
  let fixture: ComponentFixture<AdminTravelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
