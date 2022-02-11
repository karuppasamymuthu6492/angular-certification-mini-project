
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast-info',
  templateUrl: './forecast-info.component.html',
  styleUrls: ['./forecast-info.component.css']
})
export class ForecastInfoComponent implements OnInit {
  forecastDetails: any = {};
  zipcode: string = "";
  weatherIconRootUrl: string = "https://www.angulartraining.com/images/weather"

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
    this.weatherService.getForeCastInfoDetails(this.zipcode).subscribe((res: any) => {
      if (res) {
        this.forecastDetails = { ...res };
      }
    })
  }

  getFormatedForecastUrl(weatherCondition: any) {
    return weatherCondition !== "Clear"?  `${this.weatherIconRootUrl}/${weatherCondition.toLowerCase()}.png`: `${this.weatherIconRootUrl}/sun.png`
  }

}
