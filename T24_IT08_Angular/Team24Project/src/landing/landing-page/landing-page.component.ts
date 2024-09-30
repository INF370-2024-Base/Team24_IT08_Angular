import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/components/material.module';
import { ApiService } from '../../services/api.service';
import { RoomService, Room } from '../../services/room.service';
import { FeedbackService } from '../../services/feedback.service'; // Import the FeedbackService
import { Feedback } from '../../services/guest.service';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  rooms: Room[] = [];
  errorMessage: string = '';
  guestFeedbacks: Feedback[] = [
    // Prepopulated feedback for aesthetics
    { feedbackId: 1, guestId: 101, rating: 5, comments: 'Fantastic experience, will visit again!', submittedAt: new Date() },
    { feedbackId: 2, guestId: 102, rating: 4, comments: 'Beautiful place and great service!', submittedAt: new Date() },
    { feedbackId: 3, guestId: 103, rating: 5, comments: 'Highly recommend Sunflower Guesthouse.', submittedAt: new Date() },
    { feedbackId: 4, guestId: 104, rating: 4, comments: 'Cozy rooms and friendly staff.', submittedAt: new Date() }
  ]; 

  constructor(private roomService: RoomService,private feedbackService: FeedbackService ) {}

  ngOnInit(): void {
    this.loadRooms();
    this.getGuestFeedbacks(); 
  }

  ngAfterViewInit(): void {
    this.initializeSlider();
  }

  getGuestFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe(
      (feedbacks: Feedback[]) => {
        this.guestFeedbacks = feedbacks; // Assign the fetched feedback to guestFeedbacks array
      },
      (error) => {
        console.error('Error fetching feedback:', error); // Log any errors
      }
    );
  }

  getStars(rating: number): Array<number> {
    return Array(rating).fill(1); // Generate an array of stars based on the rating
  }
  loadRooms(): void {
    this.roomService.getRooms().subscribe(
      (data: Room[]) => {
        this.rooms = data;
      },
      (error: any) => {
        this.errorMessage = 'Failed to load rooms. Please try again later.';
        console.error('Error loading rooms:', error);
      }
    );
  }

  logRoomId(roomId: number) {
    console.log('Room ID:', roomId);
  }

  private initializeSlider(): void {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    document.querySelector('.next')?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      this.updateSlider(currentIndex);
    });

    document.querySelector('.prev')?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      this.updateSlider(currentIndex);
    });
  }

  private updateSlider(index: number): void {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
  
}