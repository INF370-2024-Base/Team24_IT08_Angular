// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { LikeService } from '../../../services/LikeService';

// interface MediaResponse {
//   data: MediaItem[];
// }

// interface CurrentUser {
//   Email: string;
//   token: string;
//   role?: string;
// }

// interface MediaItem {
//   id: string;
//   caption: string;
//   media_type: string;
//   media_url: string;
//   permalink: string;
//   likedByUser?: boolean;  // Optional property to track if the current user has liked the media
// }

// interface ProfileResponse {
//   id: string;
//   username: string;
//   profile_picture_url: string;
// }

// @Component({
//   selector: 'app-instagram-callback',
//   standalone: true,
//   imports: [CommonModule,FormsModule,HttpClientModule],
//   templateUrl: './instagram-callback.component.html',
//   styleUrl: './instagram-callback.component.scss'
// })
// export class InstagramCallbackComponent implements OnInit{

   // Declare the userProfile property here
//    userProfile: ProfileResponse | null = null;
//    userMedia: MediaItem[] = [];
//    userId?: string;
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private http: HttpClient,
//     private likeService:LikeService
//   ) {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     //this.currentUser = currentUser.id;  // Ensure the user object has an 'id' when stored
//     //console.log('Current User email:', this.currentUser); 
//     if (currentUser && typeof currentUser.Email === 'string') {
//       this.fetchUserId(currentUser.Email);
//       console.log('email', currentUser.Email, currentUser);
//     } else {
//       console.error('currentUser or currentUser.Email is not available');
//     }
//   }

//   ngOnInit() {
//     const accessToken="IGQWRNSGY3cG84R1BJd0dMZA3NobmtlbGVscW1td0UwRHF6M21lOHVBX004SzFLdUJjVjJHY2s5UE44VU1yR0w5QjBIWVJMZAm1EZAmxYSk1nQWs0QzFMTTgzT09YUzZAVTGFkalFGV1V5SnBwV0lHWndPMXh2ZAHJ6bFkZD";
//     this.getUserProfile(accessToken);
//     this.getUserMedia(accessToken);

//     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     if (currentUser && currentUser.Email) {
//       console.log('Email sent to backend:', currentUser.Email); // This will confirm what's actually sent
//       this.fetchUserId(currentUser.Email);
//     }
//     //this.getUserProfile("IGQWRNLTR0U25RZADNqQjRkeEVCYUJHaEdTdFB3dW0zU1JKbkFBcWROZA2tucEVVaktnU3dPVTd2OWpSNHhYQ3pkV0ZAjc2U2VVpWY0t3MUMyQWQ0SExpZA2ZATQU1WRmlWY05hd1dta3Q1TURZAekNBMF9zT1pfSFZAjVDAZD");  // Call the function with your token
//   }

//   // Add a method in your component to fetch the user ID
//   fetchUserId(email: string) {
//     this.http.get<string>(`https://localhost:7102/api/Auth/getuserid?email=${encodeURIComponent(email)}`, { responseType: 'text' as 'json' })
//       .subscribe({
//         next: (userId) => {
//           this.userId = userId;
//           console.log('Fetched User ID:', userId);
//         },
//         error: (error) => console.error('Failed to fetch user ID:', error)
//       });
//   }
//   //https://localhost:7102/api/Instagram/profile?accessToken=IGQWRQdmVOYzF5RjIyUE12X05ZAWW9TU3RHY2dmaDFONUVSWVcwMUhHNFFuN0Y3alM3VFhXN19JaFFvVTdCVlI4SnhsY0FYM3haUkpnZAl9pNHA2aWxpQ2VkNTJJTkxQTUhMSHpNNUVDU05lcEJSanpyUjRKMTBaQm8ZD
//     getUserProfile(accessToken: string) {
//     this.http.get<ProfileResponse>(`https://localhost:7102/api/instagram/profile?accessToken=${accessToken}`)
//       .subscribe(response => {
//         this.userProfile = response;
//         console.log('User Profile:', this.userProfile);
//       }, error => {
//         console.error('Error fetching profile:', error);
//       });
//   }

//   getUserMedia(accessToken: string) {
//     this.http.get<MediaResponse>(`https://localhost:7102/api/instagram/media?accessToken=${accessToken}`)
//       .subscribe(response => {
//         this.userMedia = response.data;
//         console.log('User Media:', this.userMedia);
//       }, error => {
//         console.error('Error fetching media:', error);
//       });
//   }

//   toggleLike(postId: string) {
//     // Ensure both postId and userId are valid non-empty strings
//     if (postId && this.userId && typeof postId === 'string' && typeof this.userId === 'string') {
//       // Check if the post is already liked by the user
//       if (this.isLiked(postId)) {
//         this.unlikePost(postId);
//       } else {
//         this.likePost(postId);
//       }
//     } else {
//       console.error('Invalid postId or userId');
//     }
//   }

//   likePost(postId: string) {
//     if (postId && this.userId) {
//       this.likeService.likePost(postId, this.userId).subscribe({
//         next: () => {
//           alert('Post liked!');
//           console.log('Post liked!');
//           this.updateLikeStatus(postId, true);  // Update the local state to reflect the like
//         },
//         error: (error) => console.error('Error liking the post', error)
//       });
//     }
//   }

//   updateLikeStatus(postId: string, liked: boolean) {
//     const mediaIndex = this.userMedia.findIndex(media => media.id === postId);
//     if (mediaIndex !== -1) {
//       this.userMedia[mediaIndex].likedByUser = liked; // Update liked status in the local data array
//     }
//   }

//   unlikePost(postId: string) {
//     if (postId && this.userId) {
//       this.likeService.unlikePost(postId, this.userId).subscribe({
//         next: () => {
//           alert('Post unliked!');
//           console.log('Post unliked!');
//           this.updateLikeStatus(postId, false);  // Update the local state to reflect the unlike
//         },
//         error: (error) => console.error('Error unliking the post', error)
//       });
//     }
//   }


//  // Modify isLiked to check from local state
// isLiked(postId: string): boolean {
//   const media = this.userMedia.find(media => media.id === postId);
//   return media ? media.likedByUser || false : false;
// }
// }
