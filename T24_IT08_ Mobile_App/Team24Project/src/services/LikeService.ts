import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private http: HttpClient) {}

  likePost(postId: string, userId: string) {
    return this.http.post(`https://localhost:7102/api/Instagram/${postId}`, { userId });
  }

  unlikePost(postId: string, userId: string) {
    return this.http.delete(`https://localhost:7102/api/Instagram/${postId}`, { body: { userId } });
  }
}