import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PandRService } from '../../../../../../services/P&R.service';
import { Policy } from '../policy.model';
import { PolicyDetailDialogComponent } from '../policy-detail-dialog/policy-detail-dialog.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-policies-and-regulations',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, CommonModule],
  templateUrl: './search-policies-and-regulations.component.html',
  styleUrl: './search-policies-and-regulations.component.scss',
})
export class SearchPoliciesAndRegulationsComponent implements OnInit {
  displayedColumns: string[] = ['policy', 'actions'];
  dataSource = new MatTableDataSource<Policy>();
  canApprove: boolean = false;
  canUpdate: boolean = false;
  canDelete: boolean = false;
  canCreate: boolean = false;

  constructor(
    private pandrService: PandRService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('SearchPoliciesAndRegulationsComponent initialized'); // Add this line
    this.loadPolicies();
    this.checkUserRole();
  }

  loadPolicies() {
    this.pandrService.getPolicies().subscribe((data: Policy[]) => {
      this.dataSource.data = data;
    });
  }

  checkUserRole() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.canApprove = currentUser.role === 'Admin';
    this.canUpdate =
      currentUser.role === 'Admin' || currentUser.role === 'Staff';
    this.canDelete = currentUser.role === 'Admin';
    this.canCreate =
      currentUser.role === 'Admin' || currentUser.role === 'Staff';
  }

  goBack() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const role = currentUser.role;
    const emailaddress = currentUser.emailaddress;
  
    if (role === 'Admin') {
      this.router.navigate([`/admin-dashboard/${emailaddress}`]);
    } else if (role === 'Staff') {
      this.router.navigate([`/staff-dashboard/${emailaddress}`]);
    } else if (role === 'Guest') {
      this.router.navigate([`/guest-dashboard/${emailaddress}`]);
    } else {
      console.error('Unknown role:', role);
      this.router.navigate(['/']); // Default route or error page
    }
  }

  openPolicyDialog(policy: Policy) {
    this.dialog.open(PolicyDetailDialogComponent, {
      data: policy,
    });
  }
  approvePolicy(policy: Policy) {
    // Logic to approve the policy
    this.pandrService.approvePolicy(policy.policy_ID).subscribe(
      () => {
        this.loadPolicies();
        alert('Policy approved successfully');
        console.log('Policy approved successfully');
      },
      (error: any) => {
        alert('Error approving policy');
        console.error('Error approving policy', error);
      }
    );
  }

  updatePolicy(policy: Policy) {
    // Logic to update the policy
    const emailAddress = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    ).emailaddress;
    this.router.navigate([
       `/update-p-and-r/${policy.policy_ID}/${emailAddress}`
    ]);
  }

  deletePolicy(policy: Policy): void {
    if (confirm('Are you sure you want to delete the policy/regulation?')) {
      this.pandrService.deletePolicy(policy.policy_ID).subscribe(
        () => {
          this.loadPolicies();
          console.log('Policy/Regulation deleted successfully.');
        },
        (error: any) => {
          console.error('Error deleting policy/regulation', error);
        }
      );
    }
  }

  GoToCreatePolicyAndRegulationPage() {
    console.log('Navigating to create policy and regulations page'); // Debugging line
    const emailAddress = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    ).emailaddress;
    this.router.navigate([`/create-p-and-r/${emailAddress}`]);
  }
}
