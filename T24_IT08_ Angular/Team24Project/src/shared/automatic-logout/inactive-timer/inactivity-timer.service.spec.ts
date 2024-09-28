import { TestBed } from '@angular/core/testing';

import { InactivityTimerService } from './inactivity-timer.service';

describe('InactivityTimerService', () => {
  let service: InactivityTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactivityTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
