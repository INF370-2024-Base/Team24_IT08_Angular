import { Component, OnInit } from '@angular/core';
import { AuditlogService, AuditLog } from '../../../../../services/auditlog.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.scss'
})
export class AuditLogComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  search: any = {};
  displayedColumns: string[] = ['id', 'action', 'userName', 'timestamp', 'details'];

  constructor(private auditLogService: AuditlogService, private router:Router) { }

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  loadAuditLogs(): void {
    this.auditLogService.getAuditLogs().subscribe(
      (data: AuditLog[]) => {
        this.auditLogs = data;
      },
      (error) => {
        console.error('Error fetching audit logs', error);
      }
    );
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



  deleteOldLogs(): void {
    this.auditLogService.deleteOldLogs().subscribe(
      () => {
        this.loadAuditLogs(); // Reload logs after deletion
        alert('Old logs deleted successfully.');
      },
      (error) => {
        console.error('Error deleting old logs', error);
        alert('Failed to delete old logs.');
      }
    );
  }

  filteredAuditLogs(): AuditLog[] {
    return this.auditLogs.filter(log =>
      (!this.search.id || log.id.toString().includes(this.search.id)) &&
      (!this.search.action || log.action.toLowerCase().includes(this.search.action.toLowerCase())) &&
      (!this.search.userName || log.userName.toLowerCase().includes(this.search.userName.toLowerCase())) &&
      (!this.search.timestamp || log.timestamp.toString().includes(this.search.timestamp)) &&
      (!this.search.details || log.details.toLowerCase().includes(this.search.details.toLowerCase()))
    );
  }
}
