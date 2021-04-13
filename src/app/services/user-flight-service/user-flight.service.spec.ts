import { TestBed } from '@angular/core/testing';

import { UserFlightService } from './user-flight.service';

describe('UserFlightService', () => {
  let service: UserFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
