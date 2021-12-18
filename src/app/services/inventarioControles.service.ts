import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InventarioControles } from '../models/inventarioControles';

@Injectable({
  providedIn: 'root'
})

export class InventarioControlesService {

  private url = globals.apiUrl+"/inventarioControles";

  constructor(private http: HttpClient) { }

  getInventario() {
    return this.http.get<InventarioControles[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }
  
  addControl(control: InventarioControles): Observable<any> {
    return this.http.post<InventarioControles>(this.url, control).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  updateControl(control: InventarioControles): Observable<any> {
    return this.http.put(`${this.url}/${control.controlId}`, control).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteControl(id: number): Observable<any> {
    //console.log(`Id en servicio: ${id}`);
    return this.http.delete<InventarioControles>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }
  
}