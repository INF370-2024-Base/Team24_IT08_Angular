import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FaqService } from '../../../../../services/faq.service';
import { Router } from '@angular/router';
import { FAQ } from '../../../../../shared/models/faq.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../shared/components/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, MaterialModule, RouterLink],
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['question', 'answer', 'videoUrl', 'category', 'Editbutton', 'deletebutton'];
  dataSource = new MatTableDataSource<FAQ>();
  selectedCategory: string = ''; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private faqService: FaqService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFAQs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFAQs() {
    this.faqService.getFAQs().subscribe((FAQs: FAQ[]) => {
      this.dataSource.data = FAQs;
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFAQId(id: number) {
    this.faqService.deleteFAQ(id).subscribe(() => {
      this.showSnackBar('FAQ deleted successfully');
      this.dataSource.data = this.dataSource.data.filter(faq => faq.id !== id);
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000
    });
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
      this.router.navigate(['/']);
    }
  }

  
}
