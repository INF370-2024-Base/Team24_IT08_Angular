import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code-scanner',
  standalone: true,
  imports: [],
  templateUrl: './qr-code-scanner.component.html',
  styleUrl: './qr-code-scanner.component.scss'
})
export class QrCodeScannerComponent implements OnInit {

  scanner!: Html5QrcodeScanner;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize the QR code scanner
    this.scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
    this.scanner.render(this.onScanSuccess.bind(this), this.onScanFailure.bind(this));
  }

  // Method called when QR code is successfully scanned
  onScanSuccess(decodedText: string): void {
    console.log(`QR Code detected: ${decodedText}`);
  
    try {
      // Parse the decoded text as a URL
      const url = new URL(decodedText);
      // Extract the guestId from the URL's query parameters
      const guestId = url.searchParams.get('guestId');
  
      if (guestId) {
        // Navigate to the feedback form with the extracted guestId
        this.router.navigate(['/feedback-form'], { queryParams: { guestId: guestId } });
      } else {
        console.error('No guestId found in the QR code URL.');
      }
    } catch (error) {
      console.error('Failed to parse QR code as URL:', error);
    }
  
    // Clear the scanner after a successful scan
    this.scanner.clear();
  }
  

  // Method called when QR code scan fails
  onScanFailure(error: any): void {
    console.warn(`QR Code scan failed: ${error}`);
  }
}

