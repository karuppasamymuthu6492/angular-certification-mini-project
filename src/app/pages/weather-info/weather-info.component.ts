
import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  pincode: any = "";
  weatherLists: any[] = [];
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherInfoDetails();
    console.log("INVOKED INIT");
  }
  addLocation() {
    const data: any = {};
    if (!this.pincode) {
      return;
    }
    if (!this.checkZipCodeAlreadyExists(this.pincode)) {
      this.weatherService.getWheatherInfoDetails(this.pincode).subscribe(res => {
        if (res) {
          this.weatherLists.push(
            {
              location: res.name,
              temp: res.main.temp,
              minTemp: res.main.temp_min,
              maxTemp: res.main.temp_max,
              currCondition: res.weather[0].main,
              zipcode: this.pincode,
              icon: `https://www.angulartraining.com/images/weather/${res.weather[0].main.toLowerCase()}.png`
            }
          );
          console.log(JSON.stringify(this.weatherLists, null, 3));
          localStorage.setItem(
            'weatherListsInfo1',
            JSON.stringify(this.weatherLists)
          );
          console.log("recored added succesfully");
        } else {
          alert(`Weather report not for this pincode ${this.pincode}`);
        }
      })
    } else {
      this.pincode = '';
      alert("Zip Code Already exists");
    }

  }

  getWeatherInfoDetails() {
    const weatherLists: any[] = JSON.parse(localStorage.getItem('weatherListsInfo1')!);
    if (weatherLists) {
      this.weatherLists = weatherLists;
    } else {
      this.weatherLists = [];
    }
  }

  checkZipCodeAlreadyExists(zipCode: any) {
    const weatherLists: any[] = JSON.parse(localStorage.getItem('weatherListsInfo1')!);
    if (weatherLists) {
      return weatherLists.some(res => res.zipcode === zipCode)
    }
    return false;
  }
  deleteWeatherItemByZipCode(zipCode: any) {
    this.weatherLists = this.weatherLists.filter(res => res.zipcode !== zipCode);
    localStorage.setItem(
      'weatherListsInfo1',
      JSON.stringify(this.weatherLists)
    );
  }
}
