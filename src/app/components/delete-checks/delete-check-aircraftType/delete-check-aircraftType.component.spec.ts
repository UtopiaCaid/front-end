import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckAircraftTypeComponent } from './delete-check-aircraftType.component';

describe('DeleteCheckAircraftTypeComponent', () => {
  let component: DeleteCheckAircraftTypeComponent;
  let fixture: ComponentFixture<DeleteCheckAircraftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckAircraftTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckAircraftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
