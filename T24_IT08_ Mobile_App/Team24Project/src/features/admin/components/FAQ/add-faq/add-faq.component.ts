import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaqService } from '../../../../../services/faq.service';
import { FAQ } from '../../../../../shared/models/faq.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../../../../../shared/components/material.module';

@Component({
  selector: 'app-add-faq',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {

  addFAQ: FAQ = {
    id: 0,
    question: '',
    answer: '',
    videoUrl: '',  // Initialize videoUrl
    audioUrl: '',  // Initialize audioUrl
    category: ''   // Initialize category field
  };
  selectedFile: File | null = null;
  videos: any[] = [];
  selectedCategory: string = ''; // The selected category stored here
  isUploading: boolean = false;  // Flag to track upload state

  constructor(
    private faqService: FaqService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadVideos();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.isUploading = true;  // Set the flag to true while uploading

      this.http.post('https://localhost:7102/api/Video/upload', formData)
        .subscribe({
          next: (response: any) => {
            console.log('Video uploaded successfully. File path:', response.filePath);
            this.addFAQ.videoUrl = `https://localhost:7102${response.filePath}`;  // Set the videoUrl in addFAQ
            this.isUploading = false;  // Reset the flag
            this.loadVideos();  // Reload the list of videos after upload

            this.showSnackBar('Video uploaded successfully');
          },
          error: (error) => {
            console.error('Error uploading video:', error);
            this.isUploading = false;  // Reset the flag in case of error
            this.showSnackBar('Error uploading video. Please try again.');
          }
        });
    }
  }

  loadVideos() {
    this.http.get('https://localhost:7102/api/Video/videos').subscribe((videos: any) => {
      this.videos = videos.map((video: any) => ({
        ...video,
        filePath: `https://localhost:7102${video.filePath}`
      }));
    }, error => {
      console.error('Error fetching videos:', error);
    });
  }

  CreateFAQ() {
    if (this.isUploading) {
      this.showSnackBar('Please wait for the video upload to complete.');
      return;
    }

    // Check if the video is uploaded or selected
    if (!this.addFAQ.videoUrl && this.selectedFile) {
      this.showSnackBar('Please upload the video first.');
      return;
    }

    // Assign the selected category to the FAQ object
    this.addFAQ.category = this.selectedCategory;

    this.faqService.createFAQ(this.addFAQ).subscribe({
      next: () => {
        this.router.navigate(['faq-list']);
        this.showSnackBar('FAQ added successfully');
      },
      error: (err) => {
        console.error('Error adding FAQ:', err);
        this.showSnackBar('Error adding FAQ. Please try again.');
      }
    });
  }

  cancel() {
    this.router.navigate(["faq-list"]);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000
    });
  }
}
