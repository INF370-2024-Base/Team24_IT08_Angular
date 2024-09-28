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
  emailaddress!: string;

  constructor(
    private route: ActivatedRoute,
    private guestService: GuestService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.emailaddress = currentUser.emailaddress;

    if (this.emailaddress) {
      this.guestService.getGuestByEmail(this.emailaddress).subscribe(
        (guest: any) => {
          this.guest = guest;
        },
        error => {
          console.error('Error fetching guest profile', error);
        }
      );
    } else {
      console.error('User email not found in local storage');
    }
  }


  editProfile(): void {
    if (this.guest && this.guest.guestId) {
      this.router.navigate([`/edit-guest-profile/${this.guest.guestId}`]);
    }
  }

  deleteProfile(): void {
    if (this.emailaddress) {
      this.guestService.deleteGuestByEmail(this.emailaddress).subscribe(
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
}
