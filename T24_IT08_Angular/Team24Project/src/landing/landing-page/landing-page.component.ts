import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/components/material.module';
import { ApiService } from '../../services/api.service';
import { RoomService, Room } from '../../services/room.service';

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

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  ngAfterViewInit(): void {
    this.initializeSlider();
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