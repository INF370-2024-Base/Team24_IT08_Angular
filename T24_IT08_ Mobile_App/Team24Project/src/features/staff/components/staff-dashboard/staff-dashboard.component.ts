import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { EventService, EventBooking,Event,EventType, EventItem } from '../../../../services/event.service';
import {ChartConfiguration,ChartOptions,ChartType,ChartData, PieController,Title,Tooltip,Legend, ArcElement} from 'chart.js';
import {saveAs} from 'file-saver';
import html2canvas from 'html2canvas';


// Registering Chart.js components
import { Chart } from 'chart.js';
Chart.register(PieController, Title, Tooltip, Legend, ArcElement);

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.scss',
})
export class StaffDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('chartContainer') chartContainer?: ElementRef;

  email!: string;

    // Pie chart options
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartLegend = true;
  pieChartPlugins = [];

  pieChartDataset: ChartConfiguration<'pie'>['data']['datasets'] = [
    {
      data: [], // Data will be populated from the service
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'], // Add more colors as needed
    },
  ];
  constructor(private router: Router, private eventService:EventService) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('currentUser'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  // Use "Email" with an uppercase "E" to access the email
  if (currentUser && currentUser.Email) {
    this.email = currentUser.Email;
    console.log('Email set in ngOnInit:', this.email);
  } else {
    console.error('No email found in localStorage or currentUser is not set properly.');
    this.router.navigate(['/login']);  // Redirect to login if email is missing
  }
  }

  updateChartData(events: Event[]): void {
    const itemCounts: { [name: string]: number } = {};

    // Fetch event item details and accumulate quantities
    events.forEach(event => {
      this.eventService.getEventItemsById(event['event_Items_ID']).subscribe((eventItem: EventItem) => {
        const itemName = eventItem.name;
        if (itemCounts[itemName]) {
          itemCounts[itemName] += event['quantity'];
        } else {
          itemCounts[itemName] = event['quantity'];
        }
        this.updatePieChart(itemCounts);
      });
    });
  }

  updatePieChart(itemCounts: { [name: string]: number }) {
    const labels: string[] = [];
    const data: number[] = [];

    for (const [name, count] of Object.entries(itemCounts)) {
      labels.push(name);
      data.push(count);
    }

    this.pieChartLabels = labels;
    this.pieChartData = data;
    this.pieChartDataset[0].data = data;

    // Refresh the chart to reflect the changes
    this.chart?.update();
  }

  downloadChart(): void {
    if (this.chartContainer) {
      html2canvas(this.chartContainer.nativeElement).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, 'event-chart.png');
          }
        });
      });
    }
  }

  
  navigateToPolicies(): void {
    console.log('Navigating with email:', this.email);
    this.router.navigate([
      '/search-policies-and-regulations',
      this.email,
    ]);
  }

  navigateToCreateStaffProfile(): void {
    this.router.navigate(['/create-staff-profile', this.email]);
  }
//Check this again 
  navigateToUpdateStaffProfile(): void {
    // Assuming you have a staffId to navigate to update staff profile
    const staffId = 1; // Replace with actual staffId
    this.router.navigate(['/update-staff-profile', staffId, this.email]);
  }

  navigateToViewMyShift(): void {
    this.router.navigate(['/view-my-shift', this.email]);
  }

  navigateToSearchInspection(): void {
    this.router.navigate(['/search-inspection']);
  }

  navigateToCreateInspection(): void {
    this.router.navigate(['/create-inspection']);
  }

  navigateToEventBookings(): void {
    this.router.navigate(['/search-event-booking']);
  }

  navigateToEventTypes(): void {
    this.router.navigate(['/search-event-type']);
  }

  navigateToLAndF(): void {
    this.router.navigate(['/search-l-and-f-item/:emailaddress']);
  }
  navigateToViewHalls(): void {
    this.router.navigate(['/search-hall']);
  }
  navigateToViewRoomTypes(): void {
    this.router.navigate(['/search-room-type']);
  }
  navigateToViewRooms(): void {
    this.router.navigate(['/search-room']);
  }

  GenerateBookingsReport(): void {
    this.router.navigate([
      '/generate-bookings-report',
      this.email,
    ]);
  }

 NavigationToEvents(): void {
    this.router.navigate([
      '/book-event'
    ]);
  }
}
