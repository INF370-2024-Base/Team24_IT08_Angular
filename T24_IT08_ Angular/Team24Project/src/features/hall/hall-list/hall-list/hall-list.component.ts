import { Component, OnInit } from '@angular/core';
import { HallService, Hall } from '../../../../services/hall.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hall-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './hall-list.component.html',
  styleUrl: './hall-list.component.scss',
})
export class HallListComponent implements OnInit {
  halls: any[] = [];

  constructor(private hallService: HallService, private router:Router) {}

  ngOnInit(): void {
    this.loadHalls();
  }

  loadHalls(): void {
    this.hallService.getHalls().subscribe((data) => {
      this.halls = data;
    });
  }

  goBack() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const role = currentUser.role;
    const emailaddress = currentUser.emailaddress;
  
    if (role === 'Admin') {
      this.router.navigate([`/admin-dashboard/${emailaddress}`]);
    } else if (role === 'Staff') {
      this.router.navigate([`/staff-dashboard/${emailaddress}`]);
    } else if (role === 'Guest') {
      this.router.navigate([`/guest-dashboard/${emailaddress}`]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/']); // Default route or error page
    }
  }

  toggleAvailability(hall: any) {
    const updatedAvailability = !hall.availability;
    console.log('Sending payload:', { availability: updatedAvailability }); // Log the payload
    this.hallService
      .updateAvailability(hall.hallID, updatedAvailability)
      .subscribe(
        () => {
          hall.availability = updatedAvailability;
          console.log('Availability updated successfully');
          hall.availability = updatedAvailability;
        },
        (error) => {
          console.error('Error updating availability', error);
        }
      );
  }
}
