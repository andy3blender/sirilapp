import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { of, Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private url = `${globals.apiUrl}/dashboards`;

  constructor(private http: HttpClient) { }

  getDataChart(variable: string) {
    return this.http.get<Dashboard[]>(`${this.url}/GetDataChart/${variable}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  
}