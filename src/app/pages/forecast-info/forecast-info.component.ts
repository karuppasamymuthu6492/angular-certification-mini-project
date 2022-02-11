
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { weatherIconRootUrl } from 'src/app/constants';
import { WeatherService } from 'src/app/services/weather.service';
import { ForecastInfoList } from './forecast.model';

@Component({
  selector: 'app-forecast-info',
  templateUrl: './forecast-info.component.html',
  styleUrls: ['./forecast-info.component.css']
})
export class ForecastInfoComponent implements OnInit, OnDestroy {
  forecastDetails: ForecastInfoList = {
    location: '',
    list: []
  };
  zipcode: string = "";
  private subscription = new Subscription();
  constructor(private weatherService: WeatherService, private activatedroute: ActivatedRoute,) { }
  ngOnInit(): void {
    this.activatedroute.params.subscribe((data) => {
      this.zipcode = data['zipcode'];
      if (this.zipcode) {
        this.getforecastInfoDetails();
      }
    });

  }

  getforecastInfoDetails() {
    this.subscription = this.weatherService.getForeCastInfoDetails(this.zipcode).subscribe((res) => {
      if (res) {
        this.forecastDetails = {
          location: res.city.name,
          list: res.list
        }
      }
    })
  }

  getFormatedForecastUrl(weatherCondition: string) {
    return weatherCondition !== "Clear" ? `${weatherIconRootUrl}/${weatherCondition.toLowerCase()}.png` : `${weatherIconRootUrl}/sun.png`
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
