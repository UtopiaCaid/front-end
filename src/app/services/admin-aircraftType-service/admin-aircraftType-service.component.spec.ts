import { TestBed } from '@angular/core/testing';

import { AdminAircraftTypeServiceService } from './admin-aircraftType-service.service';

describe('AdminAircraftTypeServiceService', () => {
  let service: AdminAircraftTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAircraftTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
