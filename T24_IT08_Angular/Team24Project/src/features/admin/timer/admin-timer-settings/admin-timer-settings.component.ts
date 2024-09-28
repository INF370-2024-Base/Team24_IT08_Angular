import { Component } from '@angular/core';
import { TimerConfigService } from '../../../../services/timer-config.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-timer-settings',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './admin-timer-settings.component.html',
  styleUrl: './admin-timer-settings.component.scss'
})
export class AdminTimerSettingsComponent {
  updateInterval: number;

  constructor(private timerConfigService: TimerConfigService) {
    this.updateInterval = this.timerConfigService.getUpdateInterval();
  }

  saveInterval() {
    this.timerConfigService.setUpdateInterval(this.updateInterval);
    alert('Update interval saved successfully!');
  }
}
