import { TestBed } from '@angular/core/testing';

import { TimerConfigService } from './timer-config.service';

describe('TimerConfigService', () => {
  let service: TimerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
