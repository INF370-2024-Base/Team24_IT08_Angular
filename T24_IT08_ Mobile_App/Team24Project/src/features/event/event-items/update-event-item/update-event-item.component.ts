import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService,EventItem,EventType } from '../../../../services/event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event-item',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './update-event-item.component.html',
  styleUrl: './update-event-item.component.scss'
})
export class UpdateEventItemComponent implements OnInit{
  updateEventItemForm: FormGroup;
  eventItemId!: number; //Definite assignment assertion
  eventItem!: EventItem;
  eventTypes: EventType[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router:Router
  ) {
    this.updateEventItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      eventTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventItemId = +this.route.snapshot.paramMap.get('id')!;
    this.getEventTypes();
    this.eventService.getEventItemsById(this.eventItemId).subscribe(item => {
      this.eventItem = item;
      this.updateEventItemForm.patchValue(this.eventItem);
    });
  }

  getEventTypes(): void {
    this.eventService.getEventTypes().subscribe((types) => {
      this.eventTypes = types;
    });
  }

  getEventTypeName(eventTypeId: number): string {
    const type = this.eventTypes.find(t => t.eventTypeId === eventTypeId);
    return type ? type.name : 'Unknown';
  }
  onUpdate(): void {
    if (this.updateEventItemForm.valid) {
      const updatedEventItem: EventItem = {
        ...this.updateEventItemForm.value,
        event_Items_ID: this.eventItemId,
        dateModified: new Date(),
        dateCreated: this.eventItem.dateCreated, // Preserve the original dateCreated
        isActive: this.eventItem.isActive,
        isDeleted: this.eventItem.isDeleted
      };

      this.eventService.updateEventItem(updatedEventItem).subscribe(
        () => {
          alert('Event Item updated successfully');
          console.log('Event Item updated successfully');
          this.router.navigate(['/search-event-items']); // Adjust the route based on your configuration
          // Navigate back to the event items list or show success message
        },
        (error) => {
          alert('Error updating Event Item');
          console.error('Error updating Event Item', error);
          // Handle error
        }
      );
    }
  }
}
