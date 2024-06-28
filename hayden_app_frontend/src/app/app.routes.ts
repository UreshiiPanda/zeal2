import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { ViewlistComponent } from './grocery-list/viewlist/viewlist.component';
import { WeatherComponent } from './weather/weather.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'grocery-list/my-list', component: ViewlistComponent},
    { path: 'grocery-list', component: GroceryListComponent},
    { path: 'weather-dashboard', component: WeatherComponent },
];
