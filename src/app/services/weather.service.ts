import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_ID, ROOT_API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWheatherInfoDetails(zipcode?: any): Observable<any> {
    return this.http.get(`${ROOT_API_URL}/weather?zip=${zipcode},in&appid=${APP_ID}`);
  }
  getForeCastInfoDetails(zipCode: string): Observable<any> {
    return this.http.get(`${ROOT_API_URL}/forecast/daily?zip=${zipCode},in&appid=${APP_ID}`);
  }

}
