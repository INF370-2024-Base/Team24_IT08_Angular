import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './guest.service'; // Import Feedback model

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://localhost:7102/api/Feedback'; // Adjust with your API URL

  constructor(private http: HttpClient) {}

  // Fetch all feedback from the backend
  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/GetAllFeedback`);
  }
}
