
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
  alertMsg: string = "";
  alertMsgShow: boolean = false;
  weatherIconRootUrl: string = "https://www.angulartraining.com/images/weather"
  constructor(private weatherService: WeatherService) { }
  // "https://www.angulartraining.com/images/weather/haze.png"
  ngOnInit(): void {
    this.getWeatherInfoDetails();
  }
  // Adding Location
  addLocation() {
    const data: any = {};
    if (!this.pincode) {
      return;
    }
    if (!this.checkZipCodeAlreadyExists(this.pincode)) {
      this.weatherService.getWheatherInfoDetails(this.pincode).subscribe(res => {
        if (res) {
          let item: any =
          {
            location: res.name,
            temp: res.main.temp,
            minTemp: res.main.temp_min,
            maxTemp: res.main.temp_max,
            currCondition: res.weather[0].main,
            zipcode: this.pincode,
          }
          if (res.weather[0].main !== "Clear" && res.weather[0].main !== "Haze") {
            item.icon = `${this.weatherIconRootUrl}/${res.weather[0].main.toLowerCase()}.png`
          }
          if (res.weather[0].main === "Clear") {
            item.icon = `${this.weatherIconRootUrl}/sun.png`
          }
          if (res.weather[0].main === "Haze") {
            item.icon = `${this.weatherIconRootUrl}/snow.png`
          }
          this.weatherLists.push(
            item
          );
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
      }, error=> {
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
    const weatherLists: any[] = JSON.parse(localStorage.getItem('weatherListsInfo1')!);
    if (weatherLists) {
      this.weatherLists = weatherLists;
    } else {
      this.weatherLists = [];
    }
  }
  // Check loaction exist on the stoarge
  checkZipCodeAlreadyExists(zipCode: any) {
    const weatherLists: any[] = JSON.parse(localStorage.getItem('weatherListsInfo1')!);
    if (weatherLists) {
      return weatherLists.some(res => res.zipcode === zipCode)
    }
    return false;
  }
  // Delete Location
  deleteWeatherItemByZipCode(zipCode: any) {
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
}
