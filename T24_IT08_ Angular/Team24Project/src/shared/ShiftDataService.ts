import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShiftDataService {
  private staffShiftId: number | null = null;

  setStaffShiftId(id: number): void {
    this.staffShiftId = id;
  }

  getStaffShiftId(): number | null {
    return this.staffShiftId;
  }

  clearStaffShiftId(): void {
    this.staffShiftId = null;
  }
}
