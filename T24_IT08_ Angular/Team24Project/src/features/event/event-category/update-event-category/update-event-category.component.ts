import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService,EventItem,EventType, EventCategory } from '../../../../services/event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event-category',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './update-event-category.component.html',
  styleUrl: './update-event-category.component.scss'
})
export class UpdateEventCategoryComponent implements OnInit{
  updateEventCategoryForm: FormGroup;
  eventCategoryId!: number; //Definite assignment assertion
  eventCategory!: EventCategory;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router:Router
  ) {
    this.updateEventCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventCategoryId = +this.route.snapshot.paramMap.get('id')!;
   
    this.eventService.getEventCategoryById(this.eventCategoryId).subscribe(category => {
      this.eventCategory = category;
      this.updateEventCategoryForm.patchValue(this.eventCategory);
    });
  }

  onUpdate(): void {
    if (this.updateEventCategoryForm.valid) {
      const updatedEventCategory: EventCategory = {
        ...this.updateEventCategoryForm.value,
        eventCategoryID: this.eventCategoryId,
        dateModified: new Date(),
        dateCreated: this.eventCategory.dateCreated, // Preserve the original dateCreated
        isActive: this.eventCategory.isActive,
        isDeleted: this.eventCategory.isDeleted
      };

  this.eventService.updateEventCategory(updatedEventCategory).subscribe(
    () => {
      alert('Event Category updated successfully');
      console.log('Event Category updated successfully');
      this.router.navigate(['/search-event-categories']); // Adjust the route based on your configuration
      // Navigate back to the event items list or show success message
    },
    (error) => {
      alert('Error updating Event Category');
      console.error('Error updating Event Category', error);
      // Handle error
    }
  );
}
}
}


