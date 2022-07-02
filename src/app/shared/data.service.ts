import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Car, Flat, House, Result } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // /api/car
  getCarPrice(car: Car) : Observable<Result> {
    return this.http.post<Result>(this.baseUrl + "/car", car)
            .pipe(
                 map((data) => {
                     return data;
                 }),
                 catchError(this.handleError)
            );
  }

  // /api/house
  getHousePrice(house: House) : Observable<Result> {
    return this.http.post<Result>(this.baseUrl + "/house", house)
            .pipe(
                 map((data) => {
                     return data;
                 }),
                 catchError(this.handleError)
            );
  }
  
  // /api/flat
  getFlatPrice(flat: Flat) : Observable<Result> {
    return this.http.post<Result>(this.baseUrl + "/flat", flat)
            .pipe(
                 map((data) => {
                     return data;
                 }),
                 catchError(this.handleError)
            );
  }
  
  
  private handleError(error: HttpErrorResponse) {
    if (error.error) {
      let errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
}
