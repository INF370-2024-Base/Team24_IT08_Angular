import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerConfigService {
  private readonly intervalKey = 'timerUpdateInterval';

  constructor() { }

  getUpdateInterval(): number {
    return Number(localStorage.getItem(this.intervalKey)) || 1000; // Default to 1000ms
  }

  setUpdateInterval(interval: number): void {
    localStorage.setItem(this.intervalKey, interval.toString());
  }
}
