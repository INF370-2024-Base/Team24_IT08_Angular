import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as docx from 'docx';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import * as mammoth from 'mammoth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-performance-review',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule, ReactiveFormsModule,MatFormFieldModule, MatInputModule,MatSelectModule,MatButtonModule,MatCardModule],
  templateUrl: './staff-performance-review.component.html',
  styleUrl: './staff-performance-review.component.scss'
})
export class StaffPerformanceReviewComponent implements OnInit{
  staffPerformanceForm!: FormGroup;

  importedData: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {
    this.staffPerformanceForm = this.fb.group({
      staffId: ['', Validators.required],
      reviewDate: ['', Validators.required],
      comments: [''],
      overallRating: [0, Validators.required],
      totalShiftsReviewed: [0],
      totalEventsReviewed: [0],
      totalRoomBookingsReviewed: [0],
      metExpectations: [false],
      exceededExpectations: [false],
      punctualityScore: [0],
      qualityOfWorkScore: [0],
      customerFeedbackScore: [0],
      teamworkScore: [0],
      reviewerName: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.staffPerformanceForm.valid) {
      if (!this.staffPerformanceForm.valid) {
        alert('Please fill out all required fields.');
        return;
      }

      const formData = this.staffPerformanceForm.value;

      // Check for any negative values
  const numericFields = ['overallRating', 'totalShiftsReviewed', 'totalEventsReviewed', 'totalRoomBookingsReviewed', 'punctualityScore', 'qualityOfWorkScore', 'customerFeedbackScore', 'teamworkScore'];
  const negativeValues = numericFields.filter(field => formData[field] < 0);

  if (negativeValues.length > 0) {
    alert('Please ensure that all numeric fields have values greater than or equal to zero.');
    return;
  }


      const apiUrl = 'https://localhost:7102/api/StaffPerformanceReview/AddStaffPerformanceReview';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(apiUrl, formData, { headers })
        .subscribe({
          next: (response) => {
            console.log('Performance review submitted successfully', response);
            alert('Performance review submitted successfully');
          },
          error: (error) => {
            console.error('Error submitting performance review', error);
            alert('There was an error submitting the performance review.');
          }
        });
    }
  }
  async downloadDocument() {
    // const doc = new docx.Document({});
    const formData = this.staffPerformanceForm?.value;

    if (formData) {
      const doc = new docx.Document({
          sections: [
              {
                  children: [
                      new docx.Paragraph({
                          text: "Staff Performance Review",
                          heading: docx.HeadingLevel.HEADING_1
                      }),
                      ...Object.keys(formData).map(key => {
                          return new docx.Paragraph({
                              text: `${key}: ${formData[key]}`,
                              heading: docx.HeadingLevel.HEADING_2
                          });
                      })
                  ]
              }
          ]
      });
        const blob = await docx.Packer.toBlob(doc);
        saveAs(blob, 'StaffPerformanceReview.docx');
    } else {
        console.error('Form data is not available.');
    }
  }

  importDocument(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;

        // Parse the text and populate the form
        this.parseAndPopulateForm(text);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  parseAndPopulateForm(text: string) {
    const lines = text.split('\n');
    const formData: any = {};

    lines.forEach(line => {
      const [key, value] = line.split(':').map(part => part.trim());
      switch (key) {
        case 'staffId':
          formData.staffId = +value;
          break;
        case 'reviewDate':
          formData.reviewDate = value;
          break;
        case 'comments':
          formData.comments = value;
          break;
        case 'overallRating':
          formData.overallRating = +value;
          break;
        case 'totalShiftsReviewed':
          formData.totalShiftsReviewed = +value;
          break;
        case 'totalEventsReviewed':
          formData.totalEventsReviewed = +value;
          break;
        case 'totalRoomBookingsReviewed':
          formData.totalRoomBookingsReviewed = +value;
          break;
        case 'metExpectations':
          formData.metExpectations = value.toLowerCase() === 'true';
          break;
        case 'exceededExpectations':
          formData.exceededExpectations = value.toLowerCase() === 'true';
          break;
        case 'punctualityScore':
          formData.punctualityScore = +value;
          break;
        case 'qualityOfWorkScore':
          formData.qualityOfWorkScore = +value;
          break;
        case 'customerFeedbackScore':
          formData.customerFeedbackScore = +value;
          break;
        case 'teamworkScore':
          formData.teamworkScore = +value;
          break;
        case 'reviewerName':
          formData.reviewerName = value;
          break;
      }
    });

    this.staffPerformanceForm.setValue(formData);
  }

  goBack() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const role = currentUser.role;
    const emailaddress = currentUser.emailaddress;
  
    if (role === 'Admin') {
      this.router.navigate([`/admin-dashboard/${emailaddress}`]);
    } else if (role === 'Staff') {
      this.router.navigate([`/staff-dashboard/${emailaddress}`]);
    } else if (role === 'Guest') {
      this.router.navigate([`/guest-dashboard/${emailaddress}`]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/']); // Default route or error page
    }
  }
}
