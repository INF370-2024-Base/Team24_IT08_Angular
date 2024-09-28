import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  @Input() unavailableDates: Date[] = [];

  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: { name: string; weeks: Date[][] }[] = [];
  currentYear: number = new Date().getFullYear();  // Store the current year

  ngOnInit(): void {
    this.generateCalendar(this.currentYear);
  }

  changeYear(direction: number): void {
    this.currentYear += direction;
    this.generateCalendar(this.currentYear);
  }

  generateCalendar(year: number): void {
    let startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);
    const startDate = this.getStartOfWeek(startOfYear);
     startOfYear = this.getStartOfWeek(startOfYear);  // Adjust to start on the first Sunday before or on Jan 1
    const endDate = this.getEndOfWeek(endOfYear);
  
    let day = new Date(startOfYear);
    const calendar = [];
    let week = [];
    let currentMonth = day.getMonth();
    let monthWeeks = [];
    let monthName = day.toLocaleString('default', { month: 'long' });
  
    while (day <= endDate) {
      week.push(new Date(day));
      if (week.length === 7) {
        monthWeeks.push(week);
        week = [];
      }
      day = new Date(day.setDate(day.getDate() + 1));
      if (day.getMonth() !== currentMonth) {
        calendar.push({ name: monthName, weeks: monthWeeks });
        currentMonth = day.getMonth();
        monthName = day.toLocaleString('default', { month: 'long' });
        monthWeeks = [];
      }
    }
    // Handle any remaining days in a partial week
    if (week.length > 0) {
      monthWeeks.push(week);
    }
    // Handle the last month
    if (monthWeeks.length > 0) {
      calendar.push({ name: monthName, weeks: monthWeeks });
    }
    this.calendar = calendar;
  }
  
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();  // Sunday - 0, Monday - 1, ..., Saturday - 6
    const diff = day === 0 ? 0 : -day;  // If it's Sunday, don't adjust, otherwise move back to the previous Sunday
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
  }

  getEndOfWeek(date: Date): Date {
    const startOfWeek = this.getStartOfWeek(date);
    return new Date(startOfWeek.setDate(startOfWeek.getDate() + 6));
  }

  isUnavailable(date: Date): boolean {
    return this.unavailableDates.some(
      (unavailableDate) =>
        unavailableDate.getFullYear() === date.getFullYear() &&
        unavailableDate.getMonth() === date.getMonth() &&
        unavailableDate.getDate() === date.getDate()
    );
  }
}
