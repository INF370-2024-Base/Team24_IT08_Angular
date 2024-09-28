
import { Component, OnInit } from '@angular/core';
import { EventService, EventBooking,Event, EventItem,EventType } from '../../../../services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HallService, Hall } from '../../../../services/hall.service';

@Component({
  selector: 'app-event-report',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './event-report.component.html',
  styleUrl: './event-report.component.scss'
})
export class EventReportComponent implements OnInit {
  reportData: any;
  overallTotalRevenue: number = 0;
  error: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  // Fetch the report data from the backend
  loadReport(): void {
    this.eventService.getEventMenuItemSalesReport().subscribe(
      (data) => {
        console.log('Received Report Data:', data); // This logs the full response from the service
        
        // Correctly access the reportData and overallTotalRevenue from the response
        this.reportData = data.reportData;  // Should be data.reportData instead of data.ReportData
        this.overallTotalRevenue = data.overallTotalRevenue;
        
        console.log('Report Data:', this.reportData);  // Log the processed report data
        console.log('Overall Total Revenue:', this.overallTotalRevenue);  // Log the overall revenue
      },
      (error) => {
        console.error('Error loading report:', error);  // Log any error encountered
        this.error = 'Failed to load report.';
      }
    );
  }
  
}
