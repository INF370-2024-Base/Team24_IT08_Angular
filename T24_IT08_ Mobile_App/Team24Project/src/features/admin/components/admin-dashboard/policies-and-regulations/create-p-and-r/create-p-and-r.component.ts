import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PandRService } from '../../../../../../services/P&R.service';
import { Policy } from '../policy.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-p-and-r',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './create-p-and-r.component.html',
  styleUrl: './create-p-and-r.component.scss',
})
export class CreatePAndRComponent implements OnInit {

  emailaddress!: string;
  policy: Partial<Policy> = {
    name: '',
    description: '',
  };

  constructor(private pandrService: PandRService, private router: Router) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  this.emailaddress = currentUser.emailaddress;

  if (!this.emailaddress) {
    console.error('Email address is not set in localStorage.');
  }
  }

  createPolicyAndRegulation() {
    const currentDate = new Date();
    const newPolicyAndRegulation: Policy = {
      ...this.policy,
      dateCreated: currentDate,
      dateModified: currentDate,
      isActive: false,
      isDeleted: false,
      policy_ID: 0,
    } as Policy;

    // Ensure emailaddress is set
    if (!this.emailaddress) {
      console.error('Email address is not set.');
      alert('Email address is not set.');
      return;
    }
    this.pandrService.addPolicy(newPolicyAndRegulation).subscribe(
      () => {
        console.log('Policy created successfully');
        alert('Policy created successfully');
        this.router.navigate([
          '/search-policies-and-regulations',
          this.emailaddress,
        ]);
      },
      (error: any) => {
        console.error('Error creating policy/regulation', error);
        alert('Error creating policy/regulation');
      }
    );
  }
}
