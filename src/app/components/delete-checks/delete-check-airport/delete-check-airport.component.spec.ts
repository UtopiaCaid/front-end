import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckAirportComponent } from './delete-check-airport.component';

describe('DeleteCheckAirportComponent', () => {
  let component: DeleteCheckAirportComponent;
  let fixture: ComponentFixture<DeleteCheckAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckAirportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
