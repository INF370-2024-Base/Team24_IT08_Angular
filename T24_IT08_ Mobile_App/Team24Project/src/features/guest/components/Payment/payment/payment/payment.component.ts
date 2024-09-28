import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MaterialModule } from '../../../../../../shared/components/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  isEditing = false;
  cardInfo = {
    cardName: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: ''
  };

  months = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
  years = Array.from({length: 10}, (_, i) => (new Date().getFullYear() + i).toString());

  editCardInfo() {
    this.isEditing = true;
  }

  saveCardInfo() {
    // Save card info to the backend
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

}
