import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Chart, CategoryScale, LinearScale, RadialLinearScale, BarController, Title, Tooltip, Legend, ArcElement , BarElement} from 'chart.js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

 // Registering components and scales
Chart.register(CategoryScale, LinearScale, RadialLinearScale, BarController, ArcElement, Title, Tooltip, Legend, BarElement);