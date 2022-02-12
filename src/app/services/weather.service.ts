import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_ID, ROOT_API_URL, weatherIconRootUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWheatherInfoDetails(zipcode: string): Observable<any> {
    return this.http.get(`${ROOT_API_URL}/weather?zip=${zipcode},in&appid=${APP_ID}`);
  }
  getForeCastInfoDetails(zipCode: string): Observable<any> {
    return this.http.get(`${ROOT_API_URL}/forecast/daily?zip=${zipCode},in&appid=${APP_ID}`);
  }

  getFormatedForeCastIcon(weatherCondition: string): string {
    if (weatherCondition !== "Clear" && weatherCondition !== "Haze") {
      return `${weatherIconRootUrl}/${weatherCondition.toLowerCase()}.png`
    }
    if (weatherCondition === "Clear") {
      return `${weatherIconRootUrl}/sun.png`
    }
    if (weatherCondition === "Haze") {
      return `${weatherIconRootUrl}/snow.png`
    }
    return "";
  }

}
