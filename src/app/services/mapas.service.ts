import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mapas } from '../models/mapas';

@Injectable({
  providedIn: 'root'
})

export class MapaService {

  private url = `${globals.apiUrl}/mapas`;

  constructor(private http: HttpClient) { }

  getMapa() {
    return this.http.get<Mapas[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getMapaRR() {
    return this.http.get<Mapas[]>(`${this.url}/GetMapaRR`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

}