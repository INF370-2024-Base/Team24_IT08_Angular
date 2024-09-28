import { TestBed } from '@angular/core/testing';

import { StaffShiftsService } from './staff-shifts.service';

describe('StaffShiftsService', () => {
  let service: StaffShiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffShiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
