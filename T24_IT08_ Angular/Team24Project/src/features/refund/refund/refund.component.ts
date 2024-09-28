import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService, Refund } from '../../../services/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.scss'
})
export class RefundComponent {
  transactionID: string = '';
  errorMessage: string = '';
  refundReason: string = '';
  successMessage: string = '';
  showRefundRequestModal: boolean = false;
  showRefundSummaryModal: boolean = false;
  refundSummary: any = {};


  constructor(private http: HttpClient, private router: Router, private eventService: EventService) {}

  openRefundRequestModal() {
    if (!this.transactionID) {
      this.errorMessage = 'Please enter a valid Transaction ID.';
      return;
    }
    
    // Logic to check if the transaction ID exists before showing the modal
    this.eventService.getAllPayments().subscribe(
      (payments) => {
        const payment = payments.find(p => p.transactionID === this.transactionID);
        if (payment) {
          this.errorMessage = '';
          this.showRefundRequestModal = true;
        } else {
          this.errorMessage = 'Transaction ID not found.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while retrieving payments.';
        console.error(error);
      }
    );
  }

  closeRefundRequestModal() {
    this.showRefundRequestModal = false;
  }

  closeRefundSummaryModal() {
    this.showRefundSummaryModal = false;
  }

  
  submitRefundRequest() {

    if (!this.transactionID || !this.refundReason) {
      this.errorMessage = 'Please enter both a valid Transaction ID and a reason for the refund.';
      return;
    }

    
    this.eventService.getAllPayments().subscribe(
      (payments) => {
        const payment = payments.find(p => p.transactionID === this.transactionID);
        if (payment) {
          const refundData: Refund = {
            refundID: 0,
            refundAmount: payment.totalAmount, // Using the total amount from PayPal
            refundDate: new Date().toISOString(),
            reason: this.refundReason, // User's reason from the input field
            event_Booking_ID: payment.event_Booking_ID, // Get event_Booking_ID from the payment object
            bookingID: undefined, // You can also extract this if available in the payment object
            isApproved: true
          };
  
          this.eventService.addRefund(refundData).subscribe(
            (response: Refund) => {
              this.successMessage = 'Refund request submitted successfully.';
              this.refundSummary = response;  // Store the returned refund details
              this.showRefundRequestModal = false;
              this.showRefundSummaryModal = true;
            },
            (error) => {
              this.errorMessage = 'An error occurred while submitting the refund request.';
              console.error('Refund submission error:', error);
            }
          );
        } else {
          this.errorMessage = 'Transaction ID not found.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while retrieving payments.';
        console.error(error);
      }
    );
  }
  
  getAccessToken(): Observable<string> {
    const clientId = 'AQ4eSccAoisebQ7DU5IrO0uKZP0tRmbq6DJeE9UXBHMJ3MtJ_m9WABPeMGgBoh1MdW_oKKGX-KClYohS';
    const clientSecret = 'EPvzCpPx9y46B4nag_60PTPs7Me9so5FuWAJGeS1VaDqOm0bGX0FIiZc1L55ecV4yZ5iDM9omnFCE7Nd';
    const auth = btoa(`${clientId}:${clientSecret}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    });
  
    return this.http.post<{ access_token: string }>(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      { headers }
    ).pipe(map(response => response.access_token));
  }
  processRefund(payment: any) {
    if (!payment.saleId) {
      this.errorMessage = 'Sale ID is missing.';
      console.error('Sale ID is missing in the payment record:', payment);
      return;
    }
  
    this.getAccessToken().subscribe(token => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  
      const refundRequest = {
        amount: {
          total: payment.totalAmount.toFixed(2) /20,
          
          currency: 'USD'
        }
      
      };
      console.log('Sale ID being used for refund:', payment.saleId);
      // Use the saleId from the payment object
      this.http.post(`https://api.sandbox.paypal.com/v1/payments/sale/${payment.saleId}/refund`, refundRequest, { headers })
        .subscribe(
          (response) => {
            this.successMessage = 'Refund processed successfully.';
            this.requestRefund(payment.paymentID); // Process refund status in your system
          },
          (error) => {
            this.errorMessage = 'An error occurred while processing the refund.';
            console.error('Refund error:', error);
          }
        );
    });
  }
  requestRefund(event_ID:number) {
    this.eventService.updateRefundStatus(event_ID).subscribe(
      response => {
        alert('Refund processed successfully.');
        // You could also navigate to a confirmation page or update the UI here
      },
      error => {
        //alert('Refund could not be processed: ' + error.error);
      }
    );
  }
}
