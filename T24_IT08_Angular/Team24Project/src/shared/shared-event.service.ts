// shared-event.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { SelectedEventItem } from './event.service';
import { SelectedEventItem } from '../services/event.service';
@Injectable({ providedIn: 'root' })
export class SharedEventService {
  private selectedItems = new BehaviorSubject<SelectedEventItem[]>([]);
  selectedItems$ = this.selectedItems.asObservable();

  private selectedMenuItems = new BehaviorSubject<SelectedEventItem[]>([]);
  selectedMenuItems$ = this.selectedMenuItems.asObservable();

  private standardRate = new BehaviorSubject<number>(0);
  standardRate$ = this.standardRate.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPrice.asObservable();

  private noOfAttendees = new BehaviorSubject<number>(1);  // Default to 1 attendee
  noOfAttendees$ = this.noOfAttendees.asObservable();

   // Setting the number of attendees
   setNoOfAttendees(attendees: number): void {
    const currentTotal = this.totalPrice.getValue();
    const updatedTotal = currentTotal * attendees;
  
    // Prevent setting a negative price or resetting to zero
    if (updatedTotal > 0) {
      const roundedTotal = parseFloat(updatedTotal.toFixed(2)); // Round the updated total
      this.totalPrice.next(roundedTotal);
      console.log('Updated total price with attendees:', roundedTotal);
    } else {
      console.log('Attendees multiplier resulted in zero or negative price');
    }
  }
  setSelectedItems(items: SelectedEventItem[]): void {
    console.log('Setting Selected Items:', items);  // Add this line to verify the items
    this.selectedItems.next(items);
    console.log('Current Selected Items:', this.selectedItems.getValue());  // Log the current value of the BehaviorSubject
}

  setSelectedMenuItems(items: SelectedEventItem[]): void {
    this.selectedMenuItems.next(items);
    //this.updateTotalPrice();
  }

  // setStandardRate(rate: number): void {
  //   this.standardRate.next(rate);
  //  // this.updateTotalPrice();
  // }


// Add the updateTotalPrice method
private updateTotalPrice(): void {
  const itemsTotal = this.selectedItems.getValue().reduce((sum, item) => sum + item.quantity * item.price, 0);
  const menuItemsTotal = this.selectedMenuItems.getValue().reduce((sum, item) => sum + item.price, 0);
  const attendees = this.noOfAttendees.getValue();

  // Calculate the total price based on selected items, menu items, and number of attendees
  const calculatedTotal = (itemsTotal + menuItemsTotal) * attendees;

  this.setTotalPrice(calculatedTotal);
  console.log('Updated total price with attendees:', calculatedTotal);
}

setTotalPrice(price: number): void {
  const roundedPrice = parseFloat(price.toFixed(2)); // Round to 2 decimal places
  this.totalPrice.next(roundedPrice);
  console.log('Updated and rounded total price:', roundedPrice); // Log for debugging
}



addToTotalPrice(price: number): void {
  const currentTotal = this.totalPrice.getValue();
  const updatedTotal = currentTotal + price;
  this.setTotalPrice(updatedTotal); // Call setTotalPrice to apply rounding
  console.log('Updated total price with added menu items:', this.totalPrice.getValue()); // Log for debugging
}
  getTotalPrice(): number {
    return this.totalPrice.getValue();
  }
}
