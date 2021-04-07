import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckFlightsComponent } from './delete-check-flights.component';

describe('DeleteCheckFlightsComponent', () => {
  let component: DeleteCheckFlightsComponent;
  let fixture: ComponentFixture<DeleteCheckFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
