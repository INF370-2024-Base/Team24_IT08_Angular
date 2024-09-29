import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from '../../../../services/guest.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent implements OnInit{

  feedbackForm: FormGroup;
  guestId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private feedbackService: GuestService
  ) {
    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required],
      comments: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Attempt to parse guestId as a number
      const parsedGuestId = Number(params['guestId']);
  
      // Check if guestId is a valid number
      if (!isNaN(parsedGuestId) && parsedGuestId > 0) {
        this.guestId = parsedGuestId;
        console.log('Guest ID from query params:', this.guestId);
      } else {
        console.error('Invalid guestId:', params['guestId']);
        alert('Invalid guest ID provided. Please check the URL.');
      }
    });
  }
  

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = {
        guestId: this.guestId,  // GuestId should be a number
        rating: this.feedbackForm.get('rating')!.value,
        comments: this.feedbackForm.get('comments')!.value
      };

      console.log('Submitting feedback data:', feedbackData);  // Log the data

      this.feedbackService.submitFeedback(feedbackData).subscribe(
        response => {
          console.log('Feedback submitted:', response);
          alert('Thank you for your feedback!');
        },
        error => {
          console.error('Error submitting feedback:', error);
        }
      );
    } else {
      console.warn('Feedback form is invalid');
    }
  }

  }

