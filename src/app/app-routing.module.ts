import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastInfoComponent } from './pages/forecast-info/forecast-info.component';
import { WeatherInfoComponent } from './pages/weather-info/weather-info.component';

const routes: Routes = [
    {
        path: '', component: WeatherInfoComponent
    },
    {
        path: 'forecast/:zipcode', component: ForecastInfoComponent
    },
    {
        path: '', redirectTo: '/', pathMatch: 'full'
    },
    {
        path: '**', component: WeatherInfoComponent
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }