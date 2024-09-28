import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { MaterialModule } from '../../../../../shared/components/material.module';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent {
  contact = {
    fullName: '',
    email: '',
    message: '',
    date: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en')
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('https://localhost:7102/api/Contact/SubmitInquiry', this.contact).subscribe(
      (response: any) => {
        alert('Message sent successfully! Your inquiry ID is: ' + response.inquiry.Id);
        this.contact = {
          fullName: '',
          email: '',
          message: '',
          date: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en')
        };
      },
      error => {
        alert('There was an error submitting your message. Please try again later.');
      }
    );
  }
}