import { TestBed } from '@angular/core/testing';

import { AdminFlightServiceService } from './admin-flight-service.service';

describe('AdminFlightServiceService', () => {
  let service: AdminFlightServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFlightServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
