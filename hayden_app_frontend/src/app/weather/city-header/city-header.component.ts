import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon'
import { Subscription } from 'rxjs';
import { WeatherService } from '../../weather.service';
@Component({
  selector: 'app-city-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './city-header.component.html',
  styleUrl: './city-header.component.css'
})
export class CityHeaderComponent {
  icon!: string;
  temperature!: number;
  city_state!: string;
  city_query: string = "";
  weather_service = inject(WeatherService);
  private temperature_subscription!: Subscription;
  private city_subscription!: Subscription;
  private icon_subscription!: Subscription;

  // FIXME: fix the time
  // FIXME: search bar



  ngOnInit() {
    this.temperature_subscription = this.weather_service.get_temperature().subscribe(temp => this.temperature = temp);
    this.city_subscription = this.weather_service.get_city_state().subscribe(city_state => this.city_state = city_state);
    this.icon_subscription = this.weather_service.get_image('icon', 'today').subscribe(todaysicon => this.icon = todaysicon[0])
  }



  ngOnDestroy() {
    if (this.temperature_subscription) this.temperature_subscription.unsubscribe();
    if (this.city_subscription) this.city_subscription.unsubscribe();
    if (this.icon_subscription) this.icon_subscription.unsubscribe();
  }

  get_time(): string {
    return DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);
  }

  search(): void {
    if (!this.city_query) return;
    this.weather_service.search_city(this.city_query);
    this.city_query = '';
  }
}
