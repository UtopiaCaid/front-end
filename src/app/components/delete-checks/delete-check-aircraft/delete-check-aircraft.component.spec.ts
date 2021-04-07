import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckAircraftComponent } from './delete-check-aircraft.component';

describe('DeleteCheckAircraftComponent', () => {
  let component: DeleteCheckAircraftComponent;
  let fixture: ComponentFixture<DeleteCheckAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckAircraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
