import { TestBed } from '@angular/core/testing';

import { AdminAircraftServiceService } from './admin-aircraft-service.service';

describe('AdminAircraftServiceService', () => {
  let service: AdminAircraftServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAircraftServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
