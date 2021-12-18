import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { of, Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EscalaColor } from '../models/escalaColor';

@Injectable({
  providedIn: 'root'
})

export class EscalaColorService {

  private url = `${globals.apiUrl}/escalaColores`;

  constructor(private http: HttpClient) { }

  getEscalaColores() {
    return this.http.get<EscalaColor[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getEscalaColor(escalaId: number) {
    return this.http.get<EscalaColor>(`${this.url}/${escalaId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addEscalaColor(escala: EscalaColor): Observable<any> {
    return this.http.post<EscalaColor>(this.url, escala).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    ); 
  }

  updateEscalaColor(escala: EscalaColor): Observable<any> {
    return this.http.put(`${this.url}/${escala.escalaColorId}`, escala).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteEscalaColor(id: number): Observable<any> {
    return this.http.delete<EscalaColor>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

}