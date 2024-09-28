import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService, Hall } from '../../../../services/hall.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
  selector: 'app-update-hall',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './update-hall.component.html',
  styleUrl: './update-hall.component.scss',
})
export class UpdateHallComponent implements OnInit {
  hall: Hall | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(
    private hallService: HallService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const hallId = Number(params.get('id'));
      console.log('Fetching hall with ID:', hallId); // Add logging
      this.hallService.getHallById(hallId).subscribe(
        (hall: Hall) => {
          this.hall = hall;
          console.log('Hall data loaded:', this.hall); // Add logging
          this.cdr.detectChanges(); // Force change detection
        },
        (error: any) => {
          console.error('Error fetching hall', error);
        }
      );
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.hall) {
      this.updateHall();
    } else {
      // Mark all fields as touched to trigger validation messages
      form.controls['name'].markAsTouched();
      form.controls['description'].markAsTouched();
      form.controls['capacity'].markAsTouched();
    }
  }
  updateHall() {
    if (this.hall) {
      this.hall.isActive = true;
      this.hall.isDeleted = false;
      this.hall.dateModified = new Date();

      this.hallService.updateHall(this.hall).subscribe(
        () => {
          //alert('Hall updated successfully!');
          this.successMessage = 'Hall updated successfully!';
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/search-hall']);
          }, 3000); // Delay of 3 seconds
        },
        (error: any) => {
          //alert('Error updating hall :(');
          console.error('Error updating hall', error);
          this.successMessage = null;
          this.errorMessage = 'Error updating hall. Please try again.';
        }
      );
    }
  }
}
