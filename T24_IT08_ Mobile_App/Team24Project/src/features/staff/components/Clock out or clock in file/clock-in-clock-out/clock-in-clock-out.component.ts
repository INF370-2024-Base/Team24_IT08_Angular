import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffShifts, StaffShiftService } from '../../../../../services/staff-shift.service';
import { interval, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShiftType } from '../../../../../shared/models/shiftType.model';
import { Staff } from '../../../../../services/staff.service';
import { TimerConfigService } from '../../../../../services/timer-config.service';


@Component({
  selector: 'app-clock-in-clock-out',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './clock-in-clock-out.component.html',
  styleUrls: ['./clock-in-clock-out.component.scss'],
})
export class ClockInClockOutComponent implements OnInit, OnDestroy {
  emailaddress: string = '';
  staffShiftId: number | null = null;
  staffShift: StaffShifts | null = null;
  shiftType: ShiftType | null = null;
  staff: Staff | null = null;
  clockInTime: Date | null = null;
  clockOutTime: Date | null = null;
  today: Date = new Date();
  timeElapsed: string = '0h 0m 0s';
  totalTime: string = '';
  private clockInSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private staffShiftService: StaffShiftService,
    private router: Router,
    private timerConfigService:TimerConfigService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.emailaddress = params['emailaddress'];
      this.staffShiftId = +params['staffShiftId']; // Convert to number

      if (this.staffShiftId) {
        this.loadStaffShift();
      }
    });
  }

  loadStaffShift(): void {
    if (this.staffShiftId) {
      this.staffShiftService.getStaffShiftById(this.staffShiftId).subscribe(
        (shift: StaffShifts) => {
          this.staffShift = shift;
          this.clockInTime = shift.actualClockInTime || null;  
          this.clockOutTime = shift.actualClockOutTime || null;

          if (shift.clockIn && !shift.clockOut) {
            this.startClock();
          } else {
            this.stopClock();
            this.timeElapsed = this.calculateElapsedTime();
            this.totalTime = this.calculateElapsedTime(true);
          }
          console.log('Clock In:', shift.clockIn); // Log clockIn state
          console.log('Clock Out:', shift.clockOut); // Log clockOut state

          // if (shift.clockIn && !shift.clockOut) {
          //   this.startClock(); // Start the timer if already clocked in
          // } else {
          //   this.stopClock(); // Ensure timer is stopped if clocked out
          //   this.timeElapsed = this.calculateElapsedTime(); // Calculate elapsed time based on current shift data
          // }
        },
        (error) => {
          console.error('Error loading staff shift', error);
        }
      );
    }
  }

  calculateElapsedTime(isTotal: boolean = false): string {
    if (this.staffShift?.actualClockInTime) {
      const now = new Date();
      const endTime =
        isTotal && this.staffShift.actualClockOutTime
          ? new Date(this.staffShift.actualClockOutTime)
          : now;
      const elapsed =
        endTime.getTime() -
        new Date(this.staffShift.actualClockInTime).getTime();
      return this.formatTime(elapsed);
    }
    return '0h 0m 0s';
  }

  clockIn(): void {
    if (this.staffShiftId) {
      this.staffShiftService.clockIn(this.staffShiftId).subscribe(
        () => {
          console.log('Clock In Response: Clocked In'); // Log a message indicating successful clock-in
          this.loadStaffShift(); // Reload to get updated info
          alert('Clocked In!');
        },
        (error) => {
          console.error('Error clocking in', error);
        }
      );
    }
  }

  clockOut(): void {
    if (this.staffShiftId) {
      this.staffShiftService.clockOut(this.staffShiftId).subscribe(
        () => {
          console.log('Clock Out Response: Clocked Out'); // Log a message indicating successful clock-out
          this.loadStaffShift(); // Reload to get updated info
          this.stopClock(); // Stop the timer when clocking out
          alert('Clocked Out!');
        },
        (error) => {
          console.error('Error clocking out', error);
        }
      );
    }
  }

  startClock(): void {
    if (this.clockInSubscription) {
      console.log('Unsubscribing previous clock-in timer');
      this.clockInSubscription.unsubscribe();
    }

    const updateInterval = this.timerConfigService.getUpdateInterval();
    this.clockInSubscription = interval(updateInterval).subscribe(() => {
      if (this.staffShift?.actualClockInTime) {
        this.timeElapsed = this.calculateElapsedTime();
      }
    });
    console.log('Clock-in timer started');
  }

  stopClock(): void {
    if (this.clockInSubscription) {
      console.log('Stopping clock-in timer');
      this.clockInSubscription.unsubscribe();
      this.clockInSubscription = null; // Ensure no lingering references
    }
  }

  formatTime(ms: number): string {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  ngOnDestroy(): void {
    this.stopClock(); // Ensure timer is stopped when component is destroyed
  }
}

