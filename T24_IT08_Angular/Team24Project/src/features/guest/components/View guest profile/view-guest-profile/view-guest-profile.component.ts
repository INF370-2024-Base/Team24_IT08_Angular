import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../../../../services/guest.service';
import { CommonModule } from '@angular/common';
import { GuestInService } from '../../../../../services/guest.service';

@Component({
  selector: 'app-view-guest-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-guest-profile.component.html',
  styleUrls: ['./view-guest-profile.component.scss']
})
export class ViewGuestProfileComponent implements OnInit {
  guest!: GuestInService | null;
  errorMessage: string = '';
  Email !: string;

  constructor(
    private route: ActivatedRoute,
    private guestService: GuestService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  console.log('Current User:', currentUser);
  this.Email  = currentUser.Email ;
  console.log('Email Address:', this.Email );

  if (this.Email ) {
    this.guestService.getGuestByEmail(this.Email ).subscribe(
      (guest: any) => {
        this.guest = guest;
      },
      error => {
        console.error('Error fetching guest profile', error);
      }
    );
  } else {
    this.errorMessage = 'User email not found in local storage';
    console.error(this.errorMessage);
  }
  }


  editProfile(): void {
    if (this.guest && this.guest.guestId) {
      this.router.navigate([`/edit-guest-profile/${this.guest.guestId}`]);
    }
  }

 navigateToCreate(): void {
   
      this.router.navigate([`/create-guest-profile`]);
    
  }

  deleteProfile(): void {
    if (this.Email ) {
      this.guestService.deleteGuestByEmail(this.Email ).subscribe(
        () => {
          console.log('Guest deleted successfully');
          this.router.navigate(['/create-guest-profile']); // Adjust redirection as needed
        },
        error => {
          console.error('Error deleting guest profile', error);
          this.errorMessage = 'Error deleting guest profile';
        }
      );
    }
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
}
