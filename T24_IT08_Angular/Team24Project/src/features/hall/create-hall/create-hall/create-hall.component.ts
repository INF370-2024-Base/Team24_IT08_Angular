import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HallService, Hall } from '../../../../services/hall.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-hall',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-hall.component.html',
  styleUrl: './create-hall.component.scss',
})
export class CreateHallComponent {
  hall: Partial<Hall> = {
    name: '',
    description: '',
    capacity: 0,
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private hallService: HallService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.createHall();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(form.controls).forEach((field) => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
  createHall() {
    const currentDate = new Date();
    const newHall: Hall = {
      ...this.hall,
      dateCreated: currentDate,
      dateModified: currentDate,
      isActive: true,
      isDeleted: false,
      availability: true,
      hallID: 0,
    } as Hall;

    this.hallService.createHall(newHall).subscribe(
      () => {
        this.successMessage = 'Hall created successfully!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/search-hall']);
        }, 3000); // Delay of 3 seconds
      },
      (error: any) => {
        console.error('Error creating hall', error);
        this.successMessage = null;
        this.errorMessage = 'Error creating hall. Please try again.';
      }
    );
  }
}
