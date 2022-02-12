
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { weatherIconRootUrl } from 'src/app/constants';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherInfoList } from './weather.model'


@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit, OnDestroy {
  pincode: string = "";
  weatherLists: WeatherInfoList[] = [];
  alertMsg: string = "";
  alertMsgShow: boolean = false;
  private subscription = new Subscription();
  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getWeatherInfoDetails();
  }
  // Adding Location
  addLocation() {
    if (!this.pincode) {
      return;
    }
    if (!this.checkZipCodeAlreadyExists(this.pincode)) {
      this.subscription = this.weatherService.getWheatherInfoDetails(this.pincode).subscribe(res => {
        if (res) {
          let formatedWeatherDetails: WeatherInfoList =
          {
            location: res.name,
            temp: res.main.temp,
            minTemp: res.main.temp_min,
            maxTemp: res.main.temp_max,
            currCondition: res.weather[0].main,
            zipcode: this.pincode,
            icon: this.weatherService.getFormatedForeCastIcon(res.weather[0].main)
          }

          this.weatherLists = [formatedWeatherDetails, ...this.weatherLists];
          localStorage.setItem(
            'weatherListsInfo1',
            JSON.stringify(this.weatherLists)
          );
          this.alertMsgShow = true;
          this.alertMsg = "Location Added Successfully";
          this.hideAlertMsg();
        } else {
          alert(`Weather report not for this pincode ${this.pincode}`);
        }
      }, error => {
        this.alertMsgShow = true;
        this.alertMsg = "City not found.";
        this.hideAlertMsg();
      })
    } else {
      this.alertMsgShow = true;
      this.alertMsg = "Zip Code Already exists";
      this.hideAlertMsg();
    }

  }
  // fetching Existing  location form the local storage.
  getWeatherInfoDetails() {
    const weatherLists = JSON.parse(localStorage.getItem('weatherListsInfo1')!);
    if (weatherLists) {
      this.weatherLists = weatherLists;
    } else {
      this.weatherLists = [];
    }
  }
  // Check loaction exist on the stoarge
  checkZipCodeAlreadyExists(zipCode: string) {
    const weatherLists: WeatherInfoList[] = JSON.parse(localStorage.getItem('weatherListsInfo1')!);
    if (weatherLists) {
      return weatherLists.some(res => res.zipcode === zipCode)
    }
    return false;
  }
  // Delete Location
  deleteWeatherItemByZipCode(zipCode: string) {
    this.weatherLists.forEach((res, index) => {
      if (res.zipcode === zipCode) {
        this.weatherLists.splice(index, 1);
      }
    })
    localStorage.setItem(
      'weatherListsInfo1',
      JSON.stringify(this.weatherLists)
    );
    this.alertMsgShow = true;
    this.alertMsg = "Location removed successfully";
    this.hideAlertMsg();
  }
  // Hide alert message.
  hideAlertMsg() {
    this.pincode = "";
    setTimeout(() => {
      this.alertMsgShow = false;
      this.alertMsg = "";
    }, 2000)
  }
  ngOnDestroy() {
    // unsubscribe the Http api call.
    this.subscription.unsubscribe();
  }

}
