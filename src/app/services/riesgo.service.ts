import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { of, Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Riesgo } from '../models/riesgo';
import { ControlesVinculados } from '../models/controlesVinculados';

@Injectable({
  providedIn: 'root'
})

export class RiesgoService {

  private url = `${globals.apiUrl}/riesgos`;

  constructor(private http: HttpClient) { }

  getRiesgos() {
    return this.http.get<Riesgo[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getRiesgo(riesgoId: number) {
    return this.http.get<Riesgo[]>(`${this.url}/${riesgoId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getControlesVinculados() {
    return this.http.get<ControlesVinculados[]>(`${this.url}/GetRiesgoControles`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getRiesgosActividad(actividadId: number) {
    return this.http.get<Riesgo[]>(`${this.url}/GetRiesgoActividad/${actividadId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addRiesgo(riesgo: Riesgo): Observable<any> {
    return this.http.post<Riesgo>(this.url, riesgo).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    ); 
  }

  updateRiesgo(riesgo: Riesgo): Observable<any> {
    return this.http.put(`${this.url}/${riesgo.riesgoId}`, riesgo).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteRiesgo(id: number): Observable<any> {
    return this.http.delete<Riesgo>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getRiesgosPorRI(frecuencia: number, impacto: number) {
    return this.http.get<Riesgo[]>(`${this.url}/GetRiesgoPorRI/${frecuencia}/${impacto}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getRiesgosPorRR(frecuencia: number, impacto: number) {
    return this.http.get<Riesgo[]>(`${this.url}/GetRiesgoPorRR/${frecuencia}/${impacto}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }
}