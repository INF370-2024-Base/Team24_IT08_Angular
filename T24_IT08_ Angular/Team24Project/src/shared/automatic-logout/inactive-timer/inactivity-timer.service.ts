import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityTimerService {

  private timeoutId: any;
  private readonly timeoutDuration = 300000; // 5 minutes:300000

  constructor(private router:Router) { }

  resetTimer() {
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      console.log('Timer expired. Logging out the user now.'); // Log when the timeout expires
      this.logoutUser();
    }, this.timeoutDuration);
  }

  logoutUser() {
    console.log('Logging out due to inactivity.');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserToken');
    this.router.navigate(['/login']);
    alert('You have been logged out due to inactivity.');
  }

  startTracking() {
    //console.log('Inactivity timer started.');
    this.resetTimer();
    window.addEventListener('mousemove', () => {
     // console.log('Mouse movement detected. Resetting timer.');
      this.resetTimer();
    });
    window.addEventListener('keypress', () => {
      console.log('Keypress detected. Resetting timer.');
      this.resetTimer();
    });
    window.addEventListener('click', () => {
      console.log('Click detected. Resetting timer.');
      this.resetTimer();
    });
    window.addEventListener('scroll', () => {
      console.log('Scroll detected. Resetting timer.');
      this.resetTimer();
    });
  }

  stopTracking() {
    console.log('Inactivity timer stopped.');
    clearTimeout(this.timeoutId);
    window.removeEventListener('mousemove', () => this.resetTimer());
    window.removeEventListener('keypress', () => this.resetTimer());
    window.removeEventListener('click', () => this.resetTimer());
    window.removeEventListener('scroll', () => this.resetTimer());
  }
}
