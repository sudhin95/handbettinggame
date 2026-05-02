import { TestBed } from '@angular/core/testing';

import { GameapiserviceService } from './gameapiservice.service';

describe('GameapiserviceService', () => {
  let service: GameapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
