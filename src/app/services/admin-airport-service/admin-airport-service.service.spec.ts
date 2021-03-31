import { TestBed } from '@angular/core/testing';

import { AdminAirportServiceService } from './admin-airport-service.service';

describe('AdminAirportServiceService', () => {
  let service: AdminAirportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAirportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
