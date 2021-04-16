import { TestBed } from '@angular/core/testing';

import { AdminPaymentServiceService } from './admin-payment-service.service';

describe('AdminPaymentServiceService', () => {
  let service: AdminPaymentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPaymentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
