import { TestBed } from '@angular/core/testing';

import { AdminTravelerServiceService } from './admin-traveler-service.service';

describe('AdminTravelerServiceService', () => {
  let service: AdminTravelerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTravelerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
