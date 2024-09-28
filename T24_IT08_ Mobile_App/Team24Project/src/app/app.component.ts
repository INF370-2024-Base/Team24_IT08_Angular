import { MbscModule } from '@mobiscroll/angular';
import { Component, AfterContentChecked, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '../core/Interceptors/auth.interceptor';


//imported by Nonhlelo
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ChatSupportComponent } from "./assistant/chat-support/chat-support.component";
import { FlexLayoutModule } from '@angular/flex-layout';
//Automatic timer
import { InactivityTimerService } from '../shared/automatic-logout/inactive-timer/inactivity-timer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MbscModule, 
    RouterOutlet,
    CommonModule, 
    ReactiveFormsModule,
    RouterModule, 
    RouterLink,
    ChatSupportComponent,
    FlexLayoutModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppComponent implements AfterContentChecked {
  title = 'Team24Project';
  
    @ViewChild('sidenav', {static:true}) sidenav!: MatSidenav;
  
    isLoggedIn = false;
    
  
    constructor(private router: Router, private inactivityTimer:InactivityTimerService) {}
    

    ngOnInit() {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        console.log('Parsed currentUser:', parsedUser);
        this.isLoggedIn = true;
        this.inactivityTimer.startTracking();
      } else {
        console.log('User is not logged in.');
        this.isLoggedIn = false;
      }
    }

    toggleSidenav(){
      this.sidenav.toggle();
    }
  
    ngAfterContentChecked() {
      // Ensure the isLoggedIn is updated if the user logs out or logs in
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.isLoggedIn = true;
        this.inactivityTimer.startTracking();
      } else {
        this.isLoggedIn = false;
        this.inactivityTimer.stopTracking();
      }
    }

    ngAfterViewInit() {
      console.log('ngAfterViewInit triggered');
      console.log('isLoggedIn:', this.isLoggedIn);
    }
  
    logout() {
      console.log('Manual logout triggered.');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserToken');
      this.isLoggedIn = false;
      this.router.navigateByUrl('/login');
      this.inactivityTimer.stopTracking();
    }
  
  }
  
