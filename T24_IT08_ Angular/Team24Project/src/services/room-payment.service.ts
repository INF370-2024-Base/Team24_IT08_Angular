import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomPaymentService {
  totalAmount: number = 0;
  transactionID: string = '';
  paymentDate: string = '';
  paymentStatus: string = '';
  paymentMethod: string = '';
  saleId: string = '';
  constructor() { }
}
