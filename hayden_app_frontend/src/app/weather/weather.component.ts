import { Component, inject } from '@angular/core';
import { CityHeaderComponent } from './city-header/city-header.component';
import { HumidityComponent } from './humidity/humidity.component';
import { WindComponent } from './wind/wind.component';
import { HiLoComponent } from './hi-lo/hi-lo.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { UvIndexComponent } from './uv-index/uv-index.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CityHeaderComponent,
    HumidityComponent,
    WindComponent,
    HiLoComponent,
    TemperatureChartComponent,
    UvIndexComponent,
    PrecipitationComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  background!: string;
  weather_service = inject(WeatherService);
  private background_subscription!: Subscription;

  constructor() {
    this.weather_service.search_city("Dallas");
  }

  ngOnInit() {
    this.background_subscription = this.weather_service.get_image('image', 'today').subscribe(image => this.background = image[0] ?? '');
  }

  ngOnDestroy() {
    if (this.background_subscription) this.background_subscription.unsubscribe();
  }
}