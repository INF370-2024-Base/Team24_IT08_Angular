import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PandRService } from '../../../../../../services/P&R.service';
import { Policy } from '../policy.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-p-and-r',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './update-p-and-r.component.html',
  styleUrl: './update-p-and-r.component.scss',
})
export class UpdatePAndRComponent implements OnInit {

  emailaddress!: string;


  policy: Policy | null = null;

  constructor(
    private pandrService: PandRService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const policy_ID = Number(params.get('id'));
      const emailAddress = params.get('emailaddress'); // You can use this if needed
      console.log('Fetching policy/regulation with ID:', policy_ID);
      this.pandrService.getPolicyById(policy_ID).subscribe(
        (policy: Policy) => {
          this.policy = policy;
          console.log('Policy/Regulation data loaded:', this.policy);
          this.cdr.detectChanges();
        },
        (error: any) => {
          console.error('Error fetching policy/regulation', error);
        }
      );
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  this.emailaddress = currentUser.emailaddress;

  if (!this.emailaddress) {
    console.error('Email address is not set in localStorage.');
  }
  }

  updatePolicy(form: any) {
    if (form.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (this.policy) {
      this.policy.dateCreated = this.policy.dateCreated;
      this.policy.isActive = false;
      this.policy.isDeleted = false;
      this.policy.dateModified = new Date();

       // Ensure emailaddress is set
    if (!this.emailaddress) {
      console.error('Email address is not set.');
      alert('Email address is not set.');
      return;
    }
      this.pandrService.updatePolicy(this.policy).subscribe(
        () => {
          alert('Policy/Regulation updated successfully :)');
          this.router.navigate([
            '/search-policies-and-regulations',
            this.emailaddress,
          ]);
        },
        (error: any) => {
          alert('Error updating policy/regulation');
          this.snackBar.open(
            'Error updating policy. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
            }
          );
        }
      );
    }
  }
}
