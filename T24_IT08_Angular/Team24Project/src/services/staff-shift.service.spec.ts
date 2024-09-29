import { TestBed } from '@angular/core/testing';

import { StaffShiftService } from './staff-shift.service';

describe('StaffShiftService', () => {
  let service: StaffShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
