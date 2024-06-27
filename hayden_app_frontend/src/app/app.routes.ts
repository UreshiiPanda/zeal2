import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { WeatherComponent } from './weather/weather.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'grocery-list', component: GroceryListComponent},
    { path: 'weather-dashboard', component: WeatherComponent },
];
