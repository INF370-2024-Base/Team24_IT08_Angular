import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/components/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guest-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './guest-dashboard.component.html',
  styleUrl: './guest-dashboard.component.scss'
})
export class GuestDashboardComponent implements OnInit {
  emailaddress!: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Assuming the email address is retrieved from local storage or a similar method
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.emailaddress = currentUser.emailaddress;
  }
  logout() {
    // Implement your logout logic here
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
  guestSurname = 'Guest Surname';
  guestEmail = 'guest@example.com';
  
}



