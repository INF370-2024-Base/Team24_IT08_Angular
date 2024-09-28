import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-discount',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './event-discount.component.html',
  styleUrl: './event-discount.component.scss'
})
export class EventDiscountComponent implements OnInit {
  discountPercentage: number = 0; // Holds the current discount from backend
  updatedDiscount: number = 0; // Used for editing
  isEditing: boolean = false; // Toggle between display and edit modes
  successMessage: string = ''; // Success message after updating
  errorMessage: string = ''; // Error message in case of failure

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadDiscount();
  }

  // Fetch the current discount from the backend
  loadDiscount(): void {
    this.eventService.getConfiguration().subscribe(
      (config) => {
        this.discountPercentage = config.eventDiscount; // Set the discount from backend
        this.updatedDiscount = this.discountPercentage * 100; // Prepare the discount for display in percentage
      },
      (error) => {
        console.error('Error fetching discount:', error);
        this.errorMessage = 'Failed to load the discount percentage.';
      }
    );
  }

   // Allow the admin to edit the discount
   editDiscount(): void {
    this.isEditing = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

   // Save the updated discount percentage
   saveDiscount(): void {
    const newDiscount = this.updatedDiscount / 100; // Convert to decimal (e.g., 10% becomes 0.1)
    
    this.eventService.updateDiscount(newDiscount).subscribe(
      () => {
        this.successMessage = 'Discount updated successfully!';
        this.errorMessage = '';
        this.discountPercentage = newDiscount; // Update the local discount display
        this.isEditing = false; // Exit edit mode
      },
      (error) => {
        console.error('Error updating discount:', error);
        this.errorMessage = 'Failed to update the discount percentage.';
        this.successMessage = '';
      }
    );
  }

   // Cancel editing and revert back to display mode
   cancelEdit(): void {
    this.isEditing = false;
    this.updatedDiscount = this.discountPercentage * 100; // Reset the input field
  }
}
