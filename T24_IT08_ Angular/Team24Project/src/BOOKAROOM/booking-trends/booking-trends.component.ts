import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective} from 'ng2-charts';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/components/material.module';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-booking-trends',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MaterialModule, 
    ReactiveFormsModule, FormsModule],
  templateUrl: './booking-trends.component.html',
  styleUrl: './booking-trends.component.scss'
})
export class BookingTrendsComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  interval: string = 'daily';
  compareToPrevious: boolean = false;

  public lineChartData: any[] = [];
  public lineChartLabels: string[] = []; // Replacing Label with string[]
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors = [
    {
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
    {
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    }
  ];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookingTrends();
  }

  loadBookingTrends(): void {
    this.bookingService.getBookingTrend(this.startDate, this.endDate, this.interval, this.compareToPrevious)
      .subscribe(response => {
        this.formatChartData(response.currentTrends, response.previousTrends);
      });
  }

  formatChartData(currentTrends: any[], previousTrends: any[]): void {
    const currentTotalBookings = currentTrends.map(trend => trend.totalBookings);
    const currentBookingsWithBreakfast = currentTrends.map(trend => trend.bookingsWithBreakfast);
    const currentLabels = currentTrends.map(trend => new Date(trend.date).toLocaleDateString());

    this.lineChartData = [
      { data: currentTotalBookings, label: 'Current Total Bookings', borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
      { data: currentBookingsWithBreakfast, label: 'Current Bookings With Breakfast', borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' }
    ];


    if (previousTrends) {
      const previousTotalBookings = previousTrends.map(trend => trend.totalBookings);
      const previousBookingsWithBreakfast = previousTrends.map(trend => trend.bookingsWithBreakfast);
      this.lineChartData.push(
        { data: previousTotalBookings, label: 'Previous Total Bookings', borderDash: [5, 5] },
        { data: previousBookingsWithBreakfast, label: 'Previous Bookings With Breakfast', borderDash: [5, 5] }
      );
    }

    this.lineChartLabels = currentLabels;
  }

  onSubmit(): void {
    this.loadBookingTrends();
  }
}