import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../../../services/guest.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guest-qr-code',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './guest-qr-code.component.html',
  styleUrl: './guest-qr-code.component.scss'
})
export class GuestQrCodeComponent implements OnInit {
  qrCodeImageUrl: string | ArrayBuffer | null = null;
  guestId!: number;
  constructor(private qrCodeService: GuestService, private http: HttpClient) { }

  ngOnInit(): void {
    // Get current user information from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const emailaddress = currentUser.emailaddress;
    const userId = currentUser.userId;
    const frontendBaseUrl = window.location.origin; 

   
    if (emailaddress) {
      // Fetch guestId based on emailaddress as a path parameter
      this.http.get<any>(`https://localhost:7102/api/Guest/GetGuestByEmail/${encodeURIComponent(emailaddress)}`)
        .subscribe(guest => {
          this.guestId = guest.guestId; // Extract guestId from the returned object
          this.generateQrCode(frontendBaseUrl);
        }, error => {
          console.error('Error fetching guest ID by email:', error);
        });
    } else if (userId) {
      // Fetch guestId based on userId
      this.http.get<any>(`https://localhost:7102/api/Guest/GetGuestByUserId/${userId}`)
        .subscribe(guest => {
          this.guestId = guest.guestId; // Extract guestId from the returned object
          this.generateQrCode(frontendBaseUrl);
        }, error => {
          console.error('Error fetching guest ID by userId:', error);
        });
    }
  }
  
  generateQrCode(frontendBaseUrl: string): void {
    if (typeof this.guestId !== 'number') {
      console.error('Invalid guestId:', this.guestId);
      return;
    }
  
    // Pass the frontendBaseUrl and guestId to the backend to generate the QR code
    this.qrCodeService.getQrCode(this.guestId, frontendBaseUrl).subscribe(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        this.qrCodeImageUrl = reader.result;
      };
      reader.readAsDataURL(blob);
    }, error => {
      console.error('Error generating QR code:', error);
    });
  }

}