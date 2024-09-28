import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  template: `
    <button class="btn mat-raised-button mat-primary" (click)="goBack()">Back</button>
  `,
  styleUrl: './back-button-component.component.scss'
})
export class BackButtonComponentComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}