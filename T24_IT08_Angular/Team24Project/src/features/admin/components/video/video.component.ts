import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/components/material.module';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [MatTableModule, 
    MatButtonModule, 
    CommonModule, 
    MaterialModule ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent implements OnInit{


  selectedFile: File | null = null;
  videos: any[] = [];

  constructor(private http: HttpClient) { }

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

      this.http.post('https://localhost:7102/api/Video/upload', formData)
        .subscribe((response: any) => {
          console.log('Video uploaded successfully. File path:', response.filePath);
          alert('Video uploaded successfully');
        }, error => {
          console.error('Error uploading video:', error);
          alert('Error uploading video');
        });
    }
  }

  loadVideos() {
    this.http.get('https://localhost:7102/api/Video/videos').subscribe((videos: any) => {
      this.videos = videos;
    }, error => {
      console.error('Error fetching videos:', error);
    });
  }
}
