import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  ROOT_API_URL:string = "http://api.openweathermap.org/data/2.5";
  APP_ID ="5a4b2d457ecbef9eb2a71e480b947604" 
  
  constructor(private http: HttpClient) { }
  getWheatherInfoDetails(zipcode?:any):Observable<any> {
    return this.http.get(`${this.ROOT_API_URL}/weather?zip=${zipcode},in&appid=${this.APP_ID}`);
  }
  getForeCastInfoDetails(zipCode:string) {
    return this.http.get(`${this.ROOT_API_URL}/forecast/daily?zip=${zipCode},in&appid=${this.APP_ID}`);
  }

}
