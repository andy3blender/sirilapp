import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { InventarioProcesos } from '../models/inventarioProcesos';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InventarioProcesosService {

  private url = globals.apiUrl+"/inventarioProcesos";

  constructor(private http: HttpClient) { }

  getInventario() {
    return this.http.get<InventarioProcesos[]>(this.url).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }
  
  getInventarioPorNivel(nivel: number) {
    return this.http.get<InventarioProcesos[]>(`${this.url}/GetProcesosNivel/${nivel}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  getProceosHijos(padreId: number) {
    return this.http.get<InventarioProcesos[]>(`${this.url}/GetProcesosHijos/${padreId}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  addProceso(proceso: InventarioProcesos): Observable<any> {
    return this.http.post<InventarioProcesos>(this.url, proceso).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  updateProceso(proceso: InventarioProcesos): Observable<any> {
    return this.http.put(`${this.url}/${proceso.procesoId}`, proceso).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }

  deleteProceso(id: number): Observable<any> {
    console.log(`Id en servicio: ${id}`);
    return this.http.delete<InventarioProcesos>(`${this.url}/${id}`).pipe(
      catchError(err => {
        console.log(err);
        return throwError(`${err.error.hasOwnProperty('title') ? err.error.title : err.error }: ${err.message}`);
      })
    );
  }
  
}
