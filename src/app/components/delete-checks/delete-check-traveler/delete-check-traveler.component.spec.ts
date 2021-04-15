import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckTravelerComponent } from './delete-check-traveler.component';

describe('DeleteCheckTravelerComponent', () => {
  let component: DeleteCheckTravelerComponent;
  let fixture: ComponentFixture<DeleteCheckTravelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckTravelerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckTravelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
