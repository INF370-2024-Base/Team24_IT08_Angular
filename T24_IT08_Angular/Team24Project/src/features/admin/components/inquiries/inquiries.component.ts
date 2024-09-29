import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-inquiries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.scss'
})
  export class InquiriesComponent implements OnInit {
    inquiries: any[] = [];
  
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.http.get('https://localhost:7102/api/Contact/GetInquiries').subscribe((data: any) => {
        this.inquiries = data;
      });
    }
  }
  