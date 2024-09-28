import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../../../services/guest.service';
import { GuestInService } from '../../../../services/guest.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-guest-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-guest-profile.component.html',
  styleUrl: './search-guest-profile.component.scss'
})
export class SearchGuestProfileComponent implements OnInit {
  emailaddress: string = '';
    guests: GuestInService[] = [];
    filteredGuests: GuestInService[] = [];
  
    constructor(private guestService: GuestService, private router:Router) {}
  
    ngOnInit(): void {
      this.guestService.getAllGuests().subscribe((guests) => {
        this.guests = guests;
        this.filteredGuests = guests;
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
  
    onSearch(event: Event): void {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.filteredGuests = this.guests.filter(guest =>
        guest.name?.toLowerCase().includes(searchTerm) ||
        guest.guest_Surname.toLowerCase().includes(searchTerm) ||
        guest.guest_Email.toLowerCase().includes(searchTerm) ||
        guest.guest_PhoneNo.toString().toLowerCase().includes(searchTerm) || // Convert phone number to string
        guest.description?.toLowerCase().includes(searchTerm) ||
        guest.dob.toString().toLowerCase().includes(searchTerm)
      );
    }
    

    GenerateGuestReport(): void {
      this.router.navigate([
        '/generate-guest-report',
      ]); 
    }
  }
  