import { Component, OnInit } from '@angular/core';
import { EventPaymentService } from '../../../../services/event.payment.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent implements OnInit {
  transactionId = '';
  totalAmount = 0;
  paymentDate = '';
  paymentStatus = '';
  paymentMethod = '';
  saleId = '';
  constructor(private payment: EventPaymentService, private router:Router) {}

  ngOnInit(): void {
    this.transactionId = this.payment.transactionID;
    this.totalAmount = this.payment.totalAmount;
    this.paymentDate = this.payment.paymentDate;
    this.paymentStatus = this.payment.paymentStatus;
    this.paymentMethod = this.payment.paymentMethod;
    this.saleId = this.payment.saleId;
  }

  Back() {
    this.router.navigate(['/search-event-details']);
  }
}
