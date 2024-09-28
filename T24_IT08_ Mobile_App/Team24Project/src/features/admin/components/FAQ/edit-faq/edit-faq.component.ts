import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from '../../../../../services/faq.service';
import { FAQ } from '../../../../../shared/models/faq.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../../../../../shared/components/material.module';

@Component({
  selector: 'app-edit-faq',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {

  faqAt: FAQ = {
    id: 0,
    question: '',
    answer: '',
    videoUrl: '',
    audioUrl: '',
    category: ''  // Include category field
  };

  faqForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.faqForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      videoUrl: new FormControl(''),
      audioUrl: new FormControl(''),
      category: new FormControl('')  // Add category control
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id !== null) {
          const numericId = parseInt(id, 10);
          if (!isNaN(numericId)) {


              this.faqService.getFAQById(numericId).subscribe({
                next: (response) => {
                  this.faqAt = response;
                  this.populateForm();
                },
                error: (error) => {
                  console.error('Error fetching FAQ:', error);
                }
              });
            } else {
              console.error('Invalid ID: not a number');
            }
          } else {
            console.error('Invalid ID: null');
          }
        }
      });
    }
  
    populateForm(): void {
      this.faqForm.setValue({
        question: this.faqAt.question,
        answer: this.faqAt.answer,
        videoUrl: this.faqAt.videoUrl || '',
        audioUrl: this.faqAt.audioUrl || '',
        category: this.faqAt.category || 'General'  // Default to 'General' if category is empty
      });
    }
  
    updatefaq(): void {
      if (this.faqForm.valid) {
        this.faqAt.question = this.faqForm.value.question;
        this.faqAt.answer = this.faqForm.value.answer;
        this.faqAt.videoUrl = this.faqForm.value.videoUrl;
        this.faqAt.audioUrl = this.faqForm.value.audioUrl;
        this.faqAt.category = this.faqForm.value.category;  // Capture the category
  
        this.faqService.updateFAQ(this.faqAt.id, this.faqAt).subscribe({
          next: () => {
            this.router.navigate(['faq-list']);
          },
          error: (error) => {
            console.error('Error updating FAQ:', error);
          }
        });
      } else {
        console.error('Form is invalid.');
      }
    }
  
    cancel(): void {
      this.router.navigate(['faq-list']);
    }
  }
  


