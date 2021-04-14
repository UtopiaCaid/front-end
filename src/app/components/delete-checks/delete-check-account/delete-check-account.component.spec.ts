import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCheckAccountComponent } from './delete-check-account.component';

describe('DeleteCheckAccountComponent', () => {
  let component: DeleteCheckAccountComponent;
  let fixture: ComponentFixture<DeleteCheckAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCheckAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCheckAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
