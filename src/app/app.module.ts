import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherInfoComponent } from './pages/weather-info/weather-info.component';
import { ForecastInfoComponent } from './pages/forecast-info/forecast-info.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherInfoComponent,
    ForecastInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
