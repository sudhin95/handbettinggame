import { TestBed } from '@angular/core/testing';

import { LandingapiserviceService } from './landingapiservice.service';

describe('LandingapiserviceService', () => {
  let service: LandingapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
