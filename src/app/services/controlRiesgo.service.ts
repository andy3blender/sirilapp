import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ControlRiesgo } from '../models/controlRiesgo';

@Injectable({
  providedIn: 'root'
})

export class ControlRiesgoService {

  private url = `${globals.apiUrl}/InventarioControlRiesgos`;

  constructor(private http: HttpClient) { }

  getControlRiesgos() {
    return this.http.get<ControlRiesgo[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getControlesRiesgo(riesgoId: number) {
    return this.http.get<ControlRiesgo[]>(`${this.url}/GetControlesRiesgo/${riesgoId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  updateControlRiesgo(item: ControlRiesgo): Observable<any> {
    //console.log(item);
    return this.http.put(`${this.url}/${item.controlEventoId}`, item).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addControlRiesgo(item: ControlRiesgo): Observable<any> {
    return this.http.post<ControlRiesgo>(this.url, item).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    ); 
  }

  deleteControlRiesgo(id: number): Observable<any> {
    return this.http.delete<ControlRiesgo>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteControlesVinculados(riesgoId: number): Observable<any> {
    return this.http.delete(`${this.url}/eliminaVinculados/${riesgoId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getRiesgoResidual(item: ControlRiesgo): Observable<any> {
    //console.log(item);
    return this.http.put<ControlRiesgo>(`${this.url}/calculoResidual/${item.eventoId}`, item).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

}