
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../shared/components/material.module';
import { FormsModule } from '@angular/forms';
import { FaqService } from '../../../../../services/faq.service';
import { FAQ } from '../../../../../shared/models/faq.model';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  searchQuery: string = '';
  faqs: FAQ[] = [];
  errorMessage: string = '';
  selectedCategory: string = 'General'; // Default to 'General' category

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.faqService.getFAQs().subscribe(
      (data: FAQ[]) => this.faqs = data,
      (error: any) => this.errorMessage = error
    );
  }

  get filteredFaqs() {
    return this.faqs.filter(faq =>
      (faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      faq.category === this.selectedCategory // Filter by selected category
    );
  }

  clearSearch() {
    this.searchQuery = '';
  }

  changeCategory(category: string) {
    this.selectedCategory = category;
  }

  redirectToWix() {
    window.location.href = 'https://inf370team24.wixsite.com/sunflower-guesthou-3';
  }

  openHelpDocument(format: string): void {
    if (format === 'html') {
      window.open('/assets/help-document.html', '_blank');
    } else if (format === 'pdf') {
      window.open('/assets/help-document.pdf', '_blank');
    }
  }
}
